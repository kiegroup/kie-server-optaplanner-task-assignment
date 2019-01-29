# KIE Server OptaPlanner Task Assignment
An example of assigning tasks on KIE Server using OptaPlanner.

## Requirements
- JDK 1.8 or above
- Maven 3.0+
- node.js 8.12+
- npm 6.4.1+
- [WildFly](https://download.jboss.org/wildfly/11.0.0.Final/wildfly-11.0.0.Final.zip)
- KIE Server war file from [OptaPlanner website](http://www.optaplanner.org/download/download.html) (Execution server -> Any application server, unzip to find the war file)

## Running the demo
### First start a WildFly instance and deploy KIE artifacts:
- Download and unzip the WildFly distribution. Let’s call the root of the distribution WILDFLY_HOME. This directory is named after the WildFly version, so for example `wildfly-11.0.1.Final` is the one we're using for this demo.
- Download kie-server-...-ee7.war and place it into `WILDFLY_HOME/standalone/deployments` as `kie-server.war`.
- Configure user(s) and role(s). Execute the following command `WILDFLY_HOME/bin/add-user.sh -a -u 'kieserver' -p 'kieserver1!' -ro 'kie-server'`. You can of course choose different username and password, just make sure that the user has role `kie-server`
- Start the server by running `WILDFLY_HOME/bin/standalone.sh -c standalone-full.xml`. The default URI for KIE Server is `http:/localhost:8080/kie-server/services/rest/server`. Check this location in a web browser to verify the server is running. You will be prompted to type in username and password, use the ones you chose when adding a new user.

### Now that the KIE Server is running, let's deploy an OptaPlanner service to solve a task assignment problem.
- Copy the OptaPlanner service kjar to your local mvn repository, this can be done by typing the command `mvn install` in `kie-server-optaplanner-task-assignment/task-assignment-kjar`.
- Run the UI:
  - Go to `kie-server-optaplanner-task-assignment/task-assignment-ui`
  - `npm install` to install the dependencies.
  - `npm start` this will start the frontend application. If it doesn't open in a default browser, open your favorite browser and go to `localhost:3000`

# Developing Drools and jBPM

**If you want to build or contribute to a kiegroup project, [read this document](https://github.com/kiegroup/droolsjbpm-build-bootstrap/blob/master/README.md).**

**It will save you and us a lot of time by setting up your development environment correctly.**
It solves all known pitfalls that can disrupt your development.
It also describes all guidelines, tips and tricks.
If you want your pull requests (or patches) to be merged into master, please respect those guidelines.
