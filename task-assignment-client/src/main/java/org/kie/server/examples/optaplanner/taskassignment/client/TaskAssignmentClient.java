package org.kie.server.examples.optaplanner.taskassignment.client;

import org.apache.commons.io.FileUtils;
import org.kie.server.api.marshalling.MarshallingFormat;
import org.kie.server.api.model.KieContainerResource;
import org.kie.server.api.model.ServiceResponse;
import org.kie.server.api.model.instance.SolverInstance;
import org.kie.server.client.KieServicesClient;
import org.kie.server.client.KieServicesConfiguration;
import org.kie.server.client.KieServicesFactory;
import org.kie.server.client.SolverServicesClient;
import org.kie.server.api.model.ReleaseId;
import org.kie.server.examples.optaplanner.taskassignment.kjar.domain.*;
import org.optaplanner.persistence.xstream.impl.domain.solution.XStreamSolutionFileIO;
import org.reflections.Reflections;
import org.reflections.scanners.SubTypesScanner;

import java.io.*;
import java.util.*;
import java.util.concurrent.TimeUnit;

public class TaskAssignmentClient {

    public static String CONTAINER_ID = "org.kie.server.examples.optaplanner:task-assignment-kjar:1.0-SNAPSHOT";

    public static String SERVER_URL = "serverURL";
    public static String USERNAME = "username";
    public static String PASSWORD = "password";

    SolverServicesClient solverClient;
    public KieServicesConfiguration configuration;

    public TaskAssignmentClient() {
        String url = System.getProperty(SERVER_URL, "http://localhost:8080/kie-server/services/rest/server");
        String username = System.getProperty(USERNAME, "planner");
        String password = System.getProperty(PASSWORD, "Planner123_");
        configuration = KieServicesFactory.newRestConfiguration(url, username, password);
        configuration.setTimeout(300000);
        configuration.setMarshallingFormat(MarshallingFormat.XSTREAM);

        Reflections r = new Reflections("org.kie.server.examples.optaplanner.taskassignment.kjar.domain",
                new SubTypesScanner(false));

        Set<Class<? extends Object>> domainClasses =
                r.getSubTypesOf(Object.class);

        // add model/domain classes to underlying (un)marshalling subsystem
        configuration.addExtraClasses(domainClasses);
    }


    protected void setupClients(KieServicesClient kieServicesClient) {
        this.solverClient = kieServicesClient.getServicesClient(SolverServicesClient.class);
    }

    protected KieServicesClient createDefaultClient() {
        KieServicesClient kieServicesClient = KieServicesFactory.newKieServicesClient(configuration);
        setupClients(kieServicesClient);
        return kieServicesClient;
    }

    protected TaskAssigningSolution convertFileToTaskAssigningSolution(String file) throws IOException {
        File f = File.createTempFile(file, null);
        InputStream resourceAsStream = getClass().getResourceAsStream("/data/" + file);
        FileUtils.copyInputStreamToFile(resourceAsStream, f);
        XStreamSolutionFileIO<TaskAssigningSolution> solutionFileIO = new XStreamSolutionFileIO<>(TaskAssigningSolution.class);
        TaskAssigningSolution solution = solutionFileIO.read(f);
        return solution;
    }

    public SolverServicesClient getClient() {
        return solverClient;
    }

    public static void main(String[] args) throws Exception {


        TaskAssignmentClient applicationClient = new TaskAssignmentClient();

        KieServicesClient client = applicationClient.createDefaultClient();

        ReleaseId kjar1 = new ReleaseId(
                "org.kie.server.examples.optaplanner", "task-assignment-kjar",
                "1.0-SNAPSHOT");

        KieContainerResource containerResource = new KieContainerResource(CONTAINER_ID, kjar1);

        client.deactivateContainer(CONTAINER_ID);
        client.disposeContainer(CONTAINER_ID);

        ServiceResponse<KieContainerResource> reply = client.createContainer(CONTAINER_ID, containerResource);


        SolverServicesClient solverClient = applicationClient.getClient();


        //submit tasks for solving
        String[] tasks = new String[]{"100tasks-5employees.xml", "24tasks-8employees.xml", "50tasks-5employees.xml"};
        for (String task : tasks) {
            TimeUnit.SECONDS.sleep(2);
            System.out.println("Submitting " + task);
            solverClient.createSolver(CONTAINER_ID,
                    task,
                    "org/kie/server/examples/optaplanner/taskassignment/kjar/solver/taskAssigningNonDaemonSolverConfig.xml");


            solverClient.solvePlanningProblem(CONTAINER_ID, task, applicationClient.convertFileToTaskAssigningSolution(task));
        }

        List<String> taskList = new LinkedList<>(Arrays.asList(tasks));
        int numOfTasks = taskList.size();
        ArrayList<String> completedTasks = new ArrayList<>();
        while (completedTasks.size() < numOfTasks) {
            TimeUnit.SECONDS.sleep(5);
            for (String task: taskList) {
                SolverInstance solver = solverClient.getSolver(CONTAINER_ID, task);
                if (solver.getStatus() == SolverInstance.SolverStatus.SOLVING) {
                    // continue
                    System.out.println("Still solving " + task);
                } else {
                    TaskAssigningSolution taSolution = (TaskAssigningSolution) solverClient.getSolverWithBestSolution(CONTAINER_ID, task).getBestSolution();
                    // process the solution
                    System.out.println(task + " solved, solution score:" + taSolution.getScore());
                    completedTasks.add(task);
                    solverClient.disposeSolver(CONTAINER_ID, task);
                }
            }
            taskList.removeAll(completedTasks);
        }

    }
}