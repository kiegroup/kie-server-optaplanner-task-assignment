export default {
  TaTaskAssigningSolution: {
    id: '0',
    skillList: {
      TaSkill: [
        {
          id: '0',
          name: 'Problem Solving',
        },
        {
          id: '1',
          name: 'Team Building',
        },
        {
          id: '2',
          name: 'Business Storytelling',
        },
        {
          id: '3',
          name: 'Risk Management',
        },
        {
          id: '4',
          name: 'Creative Thinking',
        },
        {
          id: '5',
          name: 'Strategic Planning',
        },
      ],
    },
    taskTypeList: {
      TaTaskType: [
        {
          id: '0',
          code: 'IS',
          title: 'Improve Sales',
          baseDuration: '30',
          requiredSkillList: {
            TaSkill: [
              {
                $reference: '../../../../skillList/TaSkill[2]',
              },
              {
                $reference: '../../../../skillList/TaSkill',
              },
            ],
          },
        },
        {
          id: '1',
          code: 'ET',
          title: 'Expand Tax',
          baseDuration: '30',
          requiredSkillList: {
            TaSkill: {
              $reference: '../../../../skillList/TaSkill[4]',
            },
          },
        },
        {
          id: '2',
          code: 'SV',
          title: 'Shrink VAT',
          baseDuration: '30',
          requiredSkillList: {
            TaSkill: {
              $reference: '../../../../skillList/TaSkill[6]',
            },
          },
        },
        {
          id: '3',
          code: 'AL',
          title: 'Approve Legal',
          baseDuration: '30',
          requiredSkillList: {
            TaSkill: [
              {
                $reference: '../../../../skillList/TaSkill[3]',
              },
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
          name: 'Steel Inc',
        },
        {
          id: '1',
          name: 'Paper Corp',
        },
        {
          id: '2',
          name: 'Stone Limited',
        },
        {
          id: '3',
          name: 'Wood Express',
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
                $reference: '../../../../skillList/TaSkill',
              },
              {
                $reference: '../../../../skillList/TaSkill[2]',
              },
              {
                $reference: '../../../../skillList/TaSkill[3]',
              },
            ],
            $class: 'linked-hash-set',
          },
          affinityMap: {
            entry: [
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer',
                },
                TaAffinity: 'HIGH',
              },
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer[2]',
                },
                TaAffinity: 'MEDIUM',
              },
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer[3]',
                },
                TaAffinity: 'NONE',
              },
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer[4]',
                },
                TaAffinity: 'MEDIUM',
              },
            ],
            $class: 'linked-hash-map',
          },
        },
        {
          id: '1',
          fullName: 'Beth',
          skillSet: {
            TaSkill: [
              {
                $reference: '../../../../skillList/TaSkill[4]',
              },
              {
                $reference: '../../../../skillList/TaSkill[5]',
              },
            ],
            $class: 'linked-hash-set',
          },
          affinityMap: {
            entry: [
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer',
                },
                TaAffinity: 'LOW',
              },
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer[2]',
                },
                TaAffinity: 'NONE',
              },
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer[3]',
                },
                TaAffinity: 'LOW',
              },
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer[4]',
                },
                TaAffinity: 'NONE',
              },
            ],
            $class: 'linked-hash-map',
          },
        },
        {
          id: '2',
          fullName: 'Chad',
          skillSet: {
            TaSkill: [
              {
                $reference: '../../../../skillList/TaSkill[6]',
              },
              {
                $reference: '../../../../skillList/TaSkill',
              },
            ],
            $class: 'linked-hash-set',
          },
          affinityMap: {
            entry: [
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer',
                },
                TaAffinity: 'MEDIUM',
              },
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer[2]',
                },
                TaAffinity: 'HIGH',
              },
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer[3]',
                },
                TaAffinity: 'HIGH',
              },
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer[4]',
                },
                TaAffinity: 'LOW',
              },
            ],
            $class: 'linked-hash-map',
          },
        },
        {
          id: '3',
          fullName: 'Dan',
          skillSet: {
            TaSkill: [
              {
                $reference: '../../../../skillList/TaSkill[2]',
              },
              {
                $reference: '../../../../skillList/TaSkill[3]',
              },
            ],
            $class: 'linked-hash-set',
          },
          affinityMap: {
            entry: [
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer',
                },
                TaAffinity: 'LOW',
              },
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer[2]',
                },
                TaAffinity: 'HIGH',
              },
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer[3]',
                },
                TaAffinity: 'HIGH',
              },
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer[4]',
                },
                TaAffinity: 'MEDIUM',
              },
            ],
            $class: 'linked-hash-map',
          },
        },
        {
          id: '4',
          fullName: 'Elsa',
          skillSet: {
            TaSkill: [
              {
                $reference: '../../../../skillList/TaSkill[4]',
              },
              {
                $reference: '../../../../skillList/TaSkill[5]',
              },
              {
                $reference: '../../../../skillList/TaSkill[6]',
              },
            ],
            $class: 'linked-hash-set',
          },
          affinityMap: {
            entry: [
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer',
                },
                TaAffinity: 'MEDIUM',
              },
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer[2]',
                },
                TaAffinity: 'NONE',
              },
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer[3]',
                },
                TaAffinity: 'MEDIUM',
              },
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer[4]',
                },
                TaAffinity: 'MEDIUM',
              },
            ],
            $class: 'linked-hash-map',
          },
        },
        {
          id: '5',
          fullName: 'Flo',
          skillSet: {
            TaSkill: [
              {
                $reference: '../../../../skillList/TaSkill',
              },
              {
                $reference: '../../../../skillList/TaSkill[2]',
              },
            ],
            $class: 'linked-hash-set',
          },
          affinityMap: {
            entry: [
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer',
                },
                TaAffinity: 'HIGH',
              },
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer[2]',
                },
                TaAffinity: 'HIGH',
              },
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer[3]',
                },
                TaAffinity: 'MEDIUM',
              },
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer[4]',
                },
                TaAffinity: 'MEDIUM',
              },
            ],
            $class: 'linked-hash-map',
          },
        },
        {
          id: '6',
          fullName: 'Gus',
          skillSet: {
            TaSkill: [
              {
                $reference: '../../../../skillList/TaSkill[3]',
              },
              {
                $reference: '../../../../skillList/TaSkill[4]',
              },
              {
                $reference: '../../../../skillList/TaSkill[5]',
              },
            ],
            $class: 'linked-hash-set',
          },
          affinityMap: {
            entry: [
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer',
                },
                TaAffinity: 'LOW',
              },
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer[2]',
                },
                TaAffinity: 'MEDIUM',
              },
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer[3]',
                },
                TaAffinity: 'LOW',
              },
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer[4]',
                },
                TaAffinity: 'LOW',
              },
            ],
            $class: 'linked-hash-map',
          },
        },
        {
          id: '7',
          fullName: 'Hugo',
          skillSet: {
            TaSkill: [
              {
                $reference: '../../../../skillList/TaSkill[6]',
              },
              {
                $reference: '../../../../skillList/TaSkill',
              },
              {
                $reference: '../../../../skillList/TaSkill[2]',
              },
            ],
            $class: 'linked-hash-set',
          },
          affinityMap: {
            entry: [
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer',
                },
                TaAffinity: 'NONE',
              },
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer[2]',
                },
                TaAffinity: 'MEDIUM',
              },
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer[3]',
                },
                TaAffinity: 'NONE',
              },
              {
                TaCustomer: {
                  $reference: '../../../../../customerList/TaCustomer[4]',
                },
                TaAffinity: 'LOW',
              },
            ],
            $class: 'linked-hash-map',
          },
        },
      ],
    },
    taskList: {
      TaTask: [
        {
          id: '0',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType[4]',
          },
          indexInTaskType: '1',
          customer: {
            $reference: '../../../customerList/TaCustomer',
          },
          readyTime: '0',
          priority: 'MAJOR',
          pinned: 'false',
        },
        {
          id: '1',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType[3]',
          },
          indexInTaskType: '1',
          customer: {
            $reference: '../../../customerList/TaCustomer[3]',
          },
          readyTime: '0',
          priority: 'CRITICAL',
          pinned: 'false',
        },
        {
          id: '2',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType[4]',
          },
          indexInTaskType: '2',
          customer: {
            $reference: '../../../customerList/TaCustomer[4]',
          },
          readyTime: '0',
          priority: 'CRITICAL',
          pinned: 'false',
        },
        {
          id: '3',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType[4]',
          },
          indexInTaskType: '3',
          customer: {
            $reference: '../../../customerList/TaCustomer[3]',
          },
          readyTime: '0',
          priority: 'CRITICAL',
          pinned: 'false',
        },
        {
          id: '4',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType[4]',
          },
          indexInTaskType: '4',
          customer: {
            $reference: '../../../customerList/TaCustomer',
          },
          readyTime: '0',
          priority: 'MAJOR',
          pinned: 'false',
        },
        {
          id: '5',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType',
          },
          indexInTaskType: '1',
          customer: {
            $reference: '../../../customerList/TaCustomer[4]',
          },
          readyTime: '0',
          priority: 'CRITICAL',
          pinned: 'false',
        },
        {
          id: '6',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType[2]',
          },
          indexInTaskType: '1',
          customer: {
            $reference: '../../../customerList/TaCustomer[4]',
          },
          readyTime: '0',
          priority: 'MINOR',
          pinned: 'false',
        },
        {
          id: '7',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType[2]',
          },
          indexInTaskType: '2',
          customer: {
            $reference: '../../../customerList/TaCustomer[2]',
          },
          readyTime: '0',
          priority: 'MINOR',
          pinned: 'false',
        },
        {
          id: '8',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType',
          },
          indexInTaskType: '2',
          customer: {
            $reference: '../../../customerList/TaCustomer[2]',
          },
          readyTime: '0',
          priority: 'MAJOR',
          pinned: 'false',
        },
        {
          id: '9',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType[2]',
          },
          indexInTaskType: '3',
          customer: {
            $reference: '../../../customerList/TaCustomer[2]',
          },
          readyTime: '0',
          priority: 'MINOR',
          pinned: 'false',
        },
        {
          id: '10',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType[4]',
          },
          indexInTaskType: '5',
          customer: {
            $reference: '../../../customerList/TaCustomer[3]',
          },
          readyTime: '0',
          priority: 'CRITICAL',
          pinned: 'false',
        },
        {
          id: '11',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType[4]',
          },
          indexInTaskType: '6',
          customer: {
            $reference: '../../../customerList/TaCustomer',
          },
          readyTime: '0',
          priority: 'CRITICAL',
          pinned: 'false',
        },
        {
          id: '12',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType[2]',
          },
          indexInTaskType: '4',
          customer: {
            $reference: '../../../customerList/TaCustomer[2]',
          },
          readyTime: '0',
          priority: 'MINOR',
          pinned: 'false',
        },
        {
          id: '13',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType[4]',
          },
          indexInTaskType: '7',
          customer: {
            $reference: '../../../customerList/TaCustomer',
          },
          readyTime: '0',
          priority: 'CRITICAL',
          pinned: 'false',
        },
        {
          id: '14',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType[3]',
          },
          indexInTaskType: '2',
          customer: {
            $reference: '../../../customerList/TaCustomer[2]',
          },
          readyTime: '0',
          priority: 'MAJOR',
          pinned: 'false',
        },
        {
          id: '15',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType[4]',
          },
          indexInTaskType: '8',
          customer: {
            $reference: '../../../customerList/TaCustomer[2]',
          },
          readyTime: '0',
          priority: 'CRITICAL',
          pinned: 'false',
        },
        {
          id: '16',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType[4]',
          },
          indexInTaskType: '9',
          customer: {
            $reference: '../../../customerList/TaCustomer[2]',
          },
          readyTime: '0',
          priority: 'MINOR',
          pinned: 'false',
        },
        {
          id: '17',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType',
          },
          indexInTaskType: '3',
          customer: {
            $reference: '../../../customerList/TaCustomer[4]',
          },
          readyTime: '0',
          priority: 'CRITICAL',
          pinned: 'false',
        },
        {
          id: '18',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType[2]',
          },
          indexInTaskType: '5',
          customer: {
            $reference: '../../../customerList/TaCustomer[4]',
          },
          readyTime: '0',
          priority: 'CRITICAL',
          pinned: 'false',
        },
        {
          id: '19',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType[3]',
          },
          indexInTaskType: '3',
          customer: {
            $reference: '../../../customerList/TaCustomer',
          },
          readyTime: '0',
          priority: 'MINOR',
          pinned: 'false',
        },
        {
          id: '20',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType[4]',
          },
          indexInTaskType: '10',
          customer: {
            $reference: '../../../customerList/TaCustomer',
          },
          readyTime: '0',
          priority: 'CRITICAL',
          pinned: 'false',
        },
        {
          id: '21',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType[3]',
          },
          indexInTaskType: '4',
          customer: {
            $reference: '../../../customerList/TaCustomer',
          },
          readyTime: '0',
          priority: 'CRITICAL',
          pinned: 'false',
        },
        {
          id: '22',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType',
          },
          indexInTaskType: '4',
          customer: {
            $reference: '../../../customerList/TaCustomer',
          },
          readyTime: '0',
          priority: 'MAJOR',
          pinned: 'false',
        },
        {
          id: '23',
          taskType: {
            $reference: '../../../taskTypeList/TaTaskType[3]',
          },
          indexInTaskType: '5',
          customer: {
            $reference: '../../../customerList/TaCustomer',
          },
          readyTime: '0',
          priority: 'MINOR',
          pinned: 'false',
        },
      ],
    },
    frozenCutoff: '0',
  },
};
