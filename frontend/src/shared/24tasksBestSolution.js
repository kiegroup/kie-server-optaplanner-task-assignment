export default {
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
            $reference: '../../../../skillList/TaSkill',
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
            $reference: '../../../../skillList/TaSkill',
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
        nextTask: {
          id: '11',
          nextTask: {
            id: '13',
            nextTask: {
              id: '20',
              nextTask: {
                id: '4',
                nextTask: {
                  id: '22',
                  nextTask: {
                    id: '0',
                    nextTask: {
                      id: '23',
                      taskType: {
                        $reference: '../../../../../../../../../../taskTypeList/TaTaskType[3]',
                      },
                      indexInTaskType: '5',
                      customer: {
                        $reference: '../../../../../../../../../../customerList/TaCustomer',
                      },
                      readyTime: '0',
                      priority: 'MINOR',
                      pinned: 'false',
                      previousTaskOrEmployee: {
                        $class: 'TaTask',
                        $reference: '../..',
                      },
                      employee: {
                        $reference: '../../../../../../../..',
                      },
                      startTime: '180',
                      endTime: '210',
                    },
                    taskType: {
                      $reference: '../../../../../../../../../taskTypeList/TaTaskType[4]',
                    },
                    indexInTaskType: '1',
                    customer: {
                      $reference: '../../../../../../../../../customerList/TaCustomer',
                    },
                    readyTime: '0',
                    priority: 'MAJOR',
                    pinned: 'false',
                    previousTaskOrEmployee: {
                      $class: 'TaTask',
                      $reference: '../..',
                    },
                    employee: {
                      $reference: '../../../../../../..',
                    },
                    startTime: '150',
                    endTime: '180',
                  },
                  taskType: {
                    $reference: '../../../../../../../../taskTypeList/TaTaskType',
                  },
                  indexInTaskType: '4',
                  customer: {
                    $reference: '../../../../../../../../customerList/TaCustomer',
                  },
                  readyTime: '0',
                  priority: 'MAJOR',
                  pinned: 'false',
                  previousTaskOrEmployee: {
                    $class: 'TaTask',
                    $reference: '../..',
                  },
                  employee: {
                    $reference: '../../../../../..',
                  },
                  startTime: '120',
                  endTime: '150',
                },
                taskType: {
                  $reference: '../../../../../../../taskTypeList/TaTaskType[4]',
                },
                indexInTaskType: '4',
                customer: {
                  $reference: '../../../../../../../customerList/TaCustomer',
                },
                readyTime: '0',
                priority: 'MAJOR',
                pinned: 'false',
                previousTaskOrEmployee: {
                  $class: 'TaTask',
                  $reference: '../..',
                },
                employee: {
                  $reference: '../../../../..',
                },
                startTime: '90',
                endTime: '120',
              },
              taskType: {
                $reference: '../../../../../../taskTypeList/TaTaskType[4]',
              },
              indexInTaskType: '10',
              customer: {
                $reference: '../../../../../../customerList/TaCustomer',
              },
              readyTime: '0',
              priority: 'CRITICAL',
              pinned: 'false',
              previousTaskOrEmployee: {
                $class: 'TaTask',
                $reference: '../..',
              },
              employee: {
                $reference: '../../../..',
              },
              startTime: '60',
              endTime: '90',
            },
            taskType: {
              $reference: '../../../../../taskTypeList/TaTaskType[4]',
            },
            indexInTaskType: '7',
            customer: {
              $reference: '../../../../../customerList/TaCustomer',
            },
            readyTime: '0',
            priority: 'CRITICAL',
            pinned: 'false',
            previousTaskOrEmployee: {
              $class: 'TaTask',
              $reference: '../..',
            },
            employee: {
              $reference: '../../..',
            },
            startTime: '30',
            endTime: '60',
          },
          taskType: {
            $reference: '../../../../taskTypeList/TaTaskType[4]',
          },
          indexInTaskType: '6',
          customer: {
            $reference: '../../../../customerList/TaCustomer',
          },
          readyTime: '0',
          priority: 'CRITICAL',
          pinned: 'false',
          previousTaskOrEmployee: {
            $class: 'TaEmployee',
            $reference: '../..',
          },
          employee: {
            $reference: '../..',
          },
          startTime: '0',
          endTime: '30',
        },
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
        nextTask: {
          id: '1',
          nextTask: {
            id: '18',
            nextTask: {
              id: '14',
              nextTask: {
                id: '9',
                taskType: {
                  $reference: '../../../../../../../taskTypeList/TaTaskType[2]',
                },
                indexInTaskType: '3',
                customer: {
                  $reference: '../../../../../../../customerList/TaCustomer[2]',
                },
                readyTime: '0',
                priority: 'MINOR',
                pinned: 'false',
                previousTaskOrEmployee: {
                  $class: 'TaTask',
                  $reference: '../..',
                },
                employee: {
                  $reference: '../../../../..',
                },
                startTime: '150',
                endTime: '180',
              },
              taskType: {
                $reference: '../../../../../../taskTypeList/TaTaskType[3]',
              },
              indexInTaskType: '2',
              customer: {
                $reference: '../../../../../../customerList/TaCustomer[2]',
              },
              readyTime: '0',
              priority: 'MAJOR',
              pinned: 'false',
              previousTaskOrEmployee: {
                $class: 'TaTask',
                $reference: '../..',
              },
              employee: {
                $reference: '../../../..',
              },
              startTime: '120',
              endTime: '150',
            },
            taskType: {
              $reference: '../../../../../taskTypeList/TaTaskType[2]',
            },
            indexInTaskType: '5',
            customer: {
              $reference: '../../../../../customerList/TaCustomer[4]',
            },
            readyTime: '0',
            priority: 'CRITICAL',
            pinned: 'false',
            previousTaskOrEmployee: {
              $class: 'TaTask',
              $reference: '../..',
            },
            employee: {
              $reference: '../../..',
            },
            startTime: '30',
            endTime: '120',
          },
          taskType: {
            $reference: '../../../../taskTypeList/TaTaskType[3]',
          },
          indexInTaskType: '1',
          customer: {
            $reference: '../../../../customerList/TaCustomer[3]',
          },
          readyTime: '0',
          priority: 'CRITICAL',
          pinned: 'false',
          previousTaskOrEmployee: {
            $class: 'TaEmployee',
            $reference: '../..',
          },
          employee: {
            $reference: '../..',
          },
          startTime: '0',
          endTime: '30',
        },
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
        nextTask: {
          id: '10',
          nextTask: {
            id: '15',
            nextTask: {
              id: '3',
              nextTask: {
                id: '2',
                nextTask: {
                  id: '16',
                  taskType: {
                    $reference: '../../../../../../../../taskTypeList/TaTaskType[4]',
                  },
                  indexInTaskType: '9',
                  customer: {
                    $reference: '../../../../../../../../customerList/TaCustomer[2]',
                  },
                  readyTime: '0',
                  priority: 'MINOR',
                  pinned: 'false',
                  previousTaskOrEmployee: {
                    $class: 'TaTask',
                    $reference: '../..',
                  },
                  employee: {
                    $reference: '../../../../../..',
                  },
                  startTime: '150',
                  endTime: '180',
                },
                taskType: {
                  $reference: '../../../../../../../taskTypeList/TaTaskType[4]',
                },
                indexInTaskType: '2',
                customer: {
                  $reference: '../../../../../../../customerList/TaCustomer[4]',
                },
                readyTime: '0',
                priority: 'CRITICAL',
                pinned: 'false',
                previousTaskOrEmployee: {
                  $class: 'TaTask',
                  $reference: '../..',
                },
                employee: {
                  $reference: '../../../../..',
                },
                startTime: '90',
                endTime: '150',
              },
              taskType: {
                $reference: '../../../../../../taskTypeList/TaTaskType[4]',
              },
              indexInTaskType: '3',
              customer: {
                $reference: '../../../../../../customerList/TaCustomer[3]',
              },
              readyTime: '0',
              priority: 'CRITICAL',
              pinned: 'false',
              previousTaskOrEmployee: {
                $class: 'TaTask',
                $reference: '../..',
              },
              employee: {
                $reference: '../../../..',
              },
              startTime: '60',
              endTime: '90',
            },
            taskType: {
              $reference: '../../../../../taskTypeList/TaTaskType[4]',
            },
            indexInTaskType: '8',
            customer: {
              $reference: '../../../../../customerList/TaCustomer[2]',
            },
            readyTime: '0',
            priority: 'CRITICAL',
            pinned: 'false',
            previousTaskOrEmployee: {
              $class: 'TaTask',
              $reference: '../..',
            },
            employee: {
              $reference: '../../..',
            },
            startTime: '30',
            endTime: '60',
          },
          taskType: {
            $reference: '../../../../taskTypeList/TaTaskType[4]',
          },
          indexInTaskType: '5',
          customer: {
            $reference: '../../../../customerList/TaCustomer[3]',
          },
          readyTime: '0',
          priority: 'CRITICAL',
          pinned: 'false',
          previousTaskOrEmployee: {
            $class: 'TaEmployee',
            $reference: '../..',
          },
          employee: {
            $reference: '../..',
          },
          startTime: '0',
          endTime: '30',
        },
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
        nextTask: {
          id: '21',
          nextTask: {
            id: '5',
            nextTask: {
              id: '12',
              nextTask: {
                id: '19',
                nextTask: {
                  id: '7',
                  taskType: {
                    $reference: '../../../../../../../../taskTypeList/TaTaskType[2]',
                  },
                  indexInTaskType: '2',
                  customer: {
                    $reference: '../../../../../../../../customerList/TaCustomer[2]',
                  },
                  readyTime: '0',
                  priority: 'MINOR',
                  pinned: 'false',
                  previousTaskOrEmployee: {
                    $class: 'TaTask',
                    $reference: '../..',
                  },
                  employee: {
                    $reference: '../../../../../..',
                  },
                  startTime: '150',
                  endTime: '180',
                },
                taskType: {
                  $reference: '../../../../../../../taskTypeList/TaTaskType[3]',
                },
                indexInTaskType: '3',
                customer: {
                  $reference: '../../../../../../../customerList/TaCustomer',
                },
                readyTime: '0',
                priority: 'MINOR',
                pinned: 'false',
                previousTaskOrEmployee: {
                  $class: 'TaTask',
                  $reference: '../..',
                },
                employee: {
                  $reference: '../../../../..',
                },
                startTime: '120',
                endTime: '150',
              },
              taskType: {
                $reference: '../../../../../../taskTypeList/TaTaskType[2]',
              },
              indexInTaskType: '4',
              customer: {
                $reference: '../../../../../../customerList/TaCustomer[2]',
              },
              readyTime: '0',
              priority: 'MINOR',
              pinned: 'false',
              previousTaskOrEmployee: {
                $class: 'TaTask',
                $reference: '../..',
              },
              employee: {
                $reference: '../../../..',
              },
              startTime: '90',
              endTime: '120',
            },
            taskType: {
              $reference: '../../../../../taskTypeList/TaTaskType',
            },
            indexInTaskType: '1',
            customer: {
              $reference: '../../../../../customerList/TaCustomer[4]',
            },
            readyTime: '0',
            priority: 'CRITICAL',
            pinned: 'false',
            previousTaskOrEmployee: {
              $class: 'TaTask',
              $reference: '../..',
            },
            employee: {
              $reference: '../../..',
            },
            startTime: '30',
            endTime: '90',
          },
          taskType: {
            $reference: '../../../../taskTypeList/TaTaskType[3]',
          },
          indexInTaskType: '4',
          customer: {
            $reference: '../../../../customerList/TaCustomer',
          },
          readyTime: '0',
          priority: 'CRITICAL',
          pinned: 'false',
          previousTaskOrEmployee: {
            $class: 'TaEmployee',
            $reference: '../..',
          },
          employee: {
            $reference: '../..',
          },
          startTime: '0',
          endTime: '30',
        },
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
        nextTask: {
          id: '17',
          nextTask: {
            id: '8',
            nextTask: {
              id: '6',
              taskType: {
                $reference: '../../../../../../taskTypeList/TaTaskType[2]',
              },
              indexInTaskType: '1',
              customer: {
                $reference: '../../../../../../customerList/TaCustomer[4]',
              },
              readyTime: '0',
              priority: 'MINOR',
              pinned: 'false',
              previousTaskOrEmployee: {
                $class: 'TaTask',
                $reference: '../..',
              },
              employee: {
                $reference: '../../../..',
              },
              startTime: '120',
              endTime: '210',
            },
            taskType: {
              $reference: '../../../../../taskTypeList/TaTaskType',
            },
            indexInTaskType: '2',
            customer: {
              $reference: '../../../../../customerList/TaCustomer[2]',
            },
            readyTime: '0',
            priority: 'MAJOR',
            pinned: 'false',
            previousTaskOrEmployee: {
              $class: 'TaTask',
              $reference: '../..',
            },
            employee: {
              $reference: '../../..',
            },
            startTime: '90',
            endTime: '120',
          },
          taskType: {
            $reference: '../../../../taskTypeList/TaTaskType',
          },
          indexInTaskType: '3',
          customer: {
            $reference: '../../../../customerList/TaCustomer[4]',
          },
          readyTime: '0',
          priority: 'CRITICAL',
          pinned: 'false',
          previousTaskOrEmployee: {
            $class: 'TaEmployee',
            $reference: '../..',
          },
          employee: {
            $reference: '../..',
          },
          startTime: '0',
          endTime: '90',
        },
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
        $reference: '../../employeeList/TaEmployee/nextTask/nextTask/nextTask/nextTask/nextTask/nextTask',
      },
      {
        $reference: '../../employeeList/TaEmployee[3]/nextTask',
      },
      {
        $reference: '../../employeeList/TaEmployee[4]/nextTask/nextTask/nextTask/nextTask',
      },
      {
        $reference: '../../employeeList/TaEmployee[4]/nextTask/nextTask/nextTask',
      },
      {
        $reference: '../../employeeList/TaEmployee/nextTask/nextTask/nextTask/nextTask',
      },
      {
        $reference: '../../employeeList/TaEmployee[6]/nextTask/nextTask',
      },
      {
        $reference: '../../employeeList/TaEmployee[8]/nextTask/nextTask/nextTask',
      },
      {
        $reference: '../../employeeList/TaEmployee[6]/nextTask/nextTask/nextTask/nextTask/nextTask',
      },
      {
        $reference: '../../employeeList/TaEmployee[8]/nextTask/nextTask',
      },
      {
        $reference: '../../employeeList/TaEmployee[3]/nextTask/nextTask/nextTask/nextTask',
      },
      {
        $reference: '../../employeeList/TaEmployee[4]/nextTask',
      },
      {
        $reference: '../../employeeList/TaEmployee/nextTask',
      },
      {
        $reference: '../../employeeList/TaEmployee[6]/nextTask/nextTask/nextTask',
      },
      {
        $reference: '../../employeeList/TaEmployee/nextTask/nextTask',
      },
      {
        $reference: '../../employeeList/TaEmployee[3]/nextTask/nextTask/nextTask',
      },
      {
        $reference: '../../employeeList/TaEmployee[4]/nextTask/nextTask',
      },
      {
        $reference: '../../employeeList/TaEmployee[4]/nextTask/nextTask/nextTask/nextTask/nextTask',
      },
      {
        $reference: '../../employeeList/TaEmployee[8]/nextTask',
      },
      {
        $reference: '../../employeeList/TaEmployee[3]/nextTask/nextTask',
      },
      {
        $reference: '../../employeeList/TaEmployee[6]/nextTask/nextTask/nextTask/nextTask',
      },
      {
        $reference: '../../employeeList/TaEmployee/nextTask/nextTask/nextTask',
      },
      {
        $reference: '../../employeeList/TaEmployee[6]/nextTask',
      },
      {
        $reference: '../../employeeList/TaEmployee/nextTask/nextTask/nextTask/nextTask/nextTask',
      },
      {
        $reference: '../../employeeList/TaEmployee/nextTask/nextTask/nextTask/nextTask/nextTask/nextTask/nextTask',
      },
    ],
  },
  score: '[0]hard/[-870/-185400/-720/-1230]soft',
  frozenCutoff: '0',
};
