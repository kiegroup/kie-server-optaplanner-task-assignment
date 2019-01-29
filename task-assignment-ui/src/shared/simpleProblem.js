export default {
  TaTaskAssigningSolution: {
    id: '0',
    skillList: {
      TaSkill: [
        {
          id: '0',
          name: 'English',
        },
        {
          id: '1',
          name: 'French',
        },
      ],
    },
    taskTypeList: {
      TaTaskType: [
        {
          id: '0',
          code: 'En',
          title: 'English',
          baseDuration: '15',
          requiredSkillList: {
            TaSkill: [
              {
                $reference: '../../../../skillList/TaSkill[1]',
              },
            ],
          },
        },
        {
          id: '1',
          code: 'Fr',
          title: 'French',
          baseDuration: '15',
          requiredSkillList: {
            TaSkill: [
              {
                $reference: '../../../../skillList/TaSkill[2]',
              },
            ],
          },
        },
      ],
    },
    customerList: {
      TaCustomer: [
        {
          id: '0',
          name: 'Marshal',
        },
        {
          id: '1',
          name: 'Emmanuel',
        },
      ],
    },
    employeeList: {
      TaEmployee: [
        {
          id: '0',
          fullName: 'Amy',
          skillSet: {
            TaSkill: [
              {
                $reference: '../../../../skillList/TaSkill[1]',
              },
              {
                $reference: '../../../../skillList/TaSkill[2]',
              },
            ],
          },
          affinityMap: {},
        },
        {
          id: '1',
          fullName: 'Beth',
          skillSet: {
            TaSkill: [
              {
                $reference: '../../../../skillList/TaSkill[1]',
              },
            ],
          },
          affinityMap: {},
        },
      ],
    },
    taskList: {
      TaTask: [
        {
          id: '0',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType[1]',
          },
          indexInTaskType: '0',
          customer: {
            $reference: '../../../customerList/TaCustomer[1]',
          },
          readyTime: '0',
          priority: 'MINOR',
          pinned: 'false',
        },
        {
          id: '1',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType[2]',
          },
          indexInTaskType: '0',
          customer: {
            $reference: '../../../customerList/TaCustomer[2]',
          },
          readyTime: '0',
          priority: 'MINOR',
          pinned: 'false',
        },
      ],
    },
  },
};
