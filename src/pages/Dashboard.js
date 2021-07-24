import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import Chart from "react-google-charts";
import * as Actions from "../redux/actions";
import { Row, Col } from 'react-flexa';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import Card from '../components/Card';

const mapStateToProps = state => {
    return {
        dashboard: state.dashboardReducer?.data,
        taskList: state.taskListReducer?.data,
        taskUpdate: state.taskReducer
    }
}

const Dashboard = (props) => {
    const { dashboard, taskList, taskUpdate } = props;
    const dispatch = useDispatch();
    const [dashboardData, setDashboardData] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [selectedEditTask, setSelectedEditTask] = useState();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        dispatch(Actions.fetchDashboard());
        dispatch(Actions.fetchTasks());
    }, [dispatch]);

    useEffect(() => {
        setDashboardData(dashboard)
    }, [dashboard])

    const addTask = () => {
        setIsEdit(false);
        setVisible(true);
    }

    const editTask = (task) => () => {
        setSelectedEditTask(task);
        setIsEdit(true);
        setVisible(true);
    }

    const deleteTask = (id) => () => {
        dispatch(Actions.deleteTask(id));
    }

    const modalContent = () => {
        return !isEdit ? <AddTaskModalContent setVisible={setVisible} dispatch={dispatch} /> :
            <EditTaskModalContent setVisible={setVisible} dispatch={dispatch} task={selectedEditTask} />
    }

    return (
        <div style={{ maxWidth: 1400, margin: 'auto', paddingTop: 24, paddingBottom: 24, backgroundColor: 'whitesmoke' }}>
            {dashboardData?.totalTasks === 0 ? <NoTask addTask={addTask} /> : <Tasks addTask={addTask} {...dashboard} tasks={taskList} taskUpdate={taskUpdate} editTask={editTask} deleteTask={deleteTask} />}
            <Modal show={visible} setVisible={setVisible} content={modalContent()} />
        </div>
    )
}

const AddTaskModalContent = ({ dispatch, setVisible }) => {
    const [taskName, setTaskName] = useState();
    const onPress = () => {
        if (taskName) {
            const task = {
                name: taskName,
                done: false
            }
            dispatch(Actions.addTask(task));
        }
        setVisible(false);
    }
    return (
        <Row
            style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.6)'
            }}
            justifyContent="center"
            alignItems="center">
            <Col xs={12} style={{
                width: '100%',
                maxWidth: '300px',
                backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0px 2px 8px -2px silver', position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <Row>
                    <h4 style={{ color: '#485460', marginBlockStart: 0, marginBlockEnd: 0 }}>+ New Task.</h4>
                </Row>
                <Row justifyContent="center">
                    <FormInput backgroundColor="whitesmoke" placeholder="Task Name" type="text" onChange={e => setTaskName(e.target.value)} />
                </Row>
                <Row>
                    <FormButton onPress={onPress} title="+ New Task" />
                </Row>
            </Col>
        </Row>
    )
}

const EditTaskModalContent = ({ dispatch, setVisible, task }) => {
    const [taskName, setTaskName] = useState(task.name);
    const onPress = () => {
        if (taskName) {
            let updatedTask = {
                ...task,
                name: taskName
            }
            dispatch(Actions.editTask(updatedTask));
        }
        setVisible(false);
    }
    return (
        <Row
            style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.6)'
            }}
            justifyContent="center"
            alignItems="center">
            <Col xs={12} style={{
                width: '100%',
                maxWidth: '300px',
                backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0px 2px 8px -2px silver', position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <Row>
                    <h4 style={{ color: '#485460', marginBlockStart: 0, marginBlockEnd: 0 }}>Edit Task.</h4>
                </Row>
                <Row justifyContent="center">
                    <FormInput backgroundColor="whitesmoke" placeholder="Task Name" type="text" value={taskName} onChange={e => setTaskName(e.target.value)} />
                </Row>
                <Row>
                    <FormButton onPress={onPress} title="Update" />
                </Row>
            </Col>
        </Row>
    )
}

const NoTask = ({ addTask }) => {
    return (
        <Row justifyContent="center" alignItems="center">
            <div style={{
                width: '100%',
                maxWidth: '300px',
                backgroundColor: 'whitesmoke', padding: '24px', borderRadius: '8px', boxShadow: '0px 2px 8px -2px silver', position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <Col xs={12}>
                    <Row justifyContent="center">
                        <h4 style={{ color: '#485460' }}>You have no task.</h4>
                    </Row>
                    <Row justifyContent="center">
                        <FormButton onPress={addTask} title="+ New Task" />
                    </Row>
                </Col>
            </div>
        </Row>
    )
}

const TaskCompletedCard = (props) => {
    const { completedTasks, totalTasks } = props;
    const content = (
        <div>
            <sup style={{ color: '#54a0ff', fontSize: '40px', fontWeight: 'bold' }}>{completedTasks}</sup><sub style={{ color: '#485460', fontSize: '20px' }}>/</sub><sub style={{ color: '#485460', fontSize: '20px' }}>{totalTasks}</sub>
        </div>
    );

    return <Card title="Tasks Completed" content={content} />
}

const LatestCreatedCard = (props) => {
    const { latestTasks } = props;
    const content = (
        <ul>
            {latestTasks?.map((task, index) => {
                return <li style={{ color: '#bdc3c7' }} key={index}><p style={{ textDecoration: task.done ? 'line-through' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.name}</p></li>
            })}
        </ul>
    );

    return <Card title="Latest Created Tasks" content={content} />
}

const ChartCard = (props) => {
    const { completedTasks, totalTasks } = props;
    const remainingTask = totalTasks - completedTasks;
    const content = (
        <Chart
            width={'100%'}
            height={'180px'}
            chartType="PieChart"
            slices={[
                {
                    color: "#007fad"
                },
                {
                    color: "#e9a227"
                }
            ]}
            legend_toggle={false}
            data={
                [
                    ['Task', 'Number of task'],
                    ['Completed', completedTasks],
                    ['Remaining', remainingTask],
                ]}
            rootProps={{ 'data-testid': '1' }
            }
        />
    );

    return <Card content={content} />
}

const TaskItem = ({ task, handlerChange, taskUpdate, editTask, deleteTask }) => {
    const { id, done, name } = task;
    return (
        <Row style={{ borderBottom: '1px solid silver', margin: '8px 40px 8px 40px', paddingTop: 24, paddingBottom: 24 }}>
            <Col xs={2}>
                {(taskUpdate?.loading && taskUpdate.id === id) ? null : <input type="checkbox" checked={done} onChange={handlerChange(task)} />}
            </Col>
            <Col xs={8}>
                <p style={{ marginBlockStart: 0, marginBlockEnd: 0, color: '#54a0ff', textDecoration: done ? 'line-through' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '24px' }}>{name}</p>
            </Col>
            <Col xs={2}>
                <Row>
                    <Col xs={6}>
                        <button style={{ border: 'none', backgroundColor: 'white' }} onClick={editTask}>
                            <i className="fa fa-pencil-square-o"></i>
                        </button>
                    </Col>
                    <Col xs={6}>
                        <button style={{ border: 'none', backgroundColor: 'white' }} onClick={deleteTask}>
                            <i className="fa fa-minus-square"></i>
                        </button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

const Tasks = (props) => {
    const { tasks, addTask, taskUpdating, editTask, deleteTask } = props;
    const dispatch = useDispatch();

    const handlerChange = (task) => () => {
        task.done = !task.done;
        task.isChangeStatus = true;
        dispatch(Actions.editTask(task));
    }

    const searchTasks = (e) => {
        dispatch(Actions.searchTasks(e.target.value));
    }

    return (
        <>
            <Row style={{ margin: '8px 16px 8px 16px' }} justifyContent="space-around">
                <TaskCompletedCard {...props} />
                <LatestCreatedCard {...props} />
                <ChartCard {...props} />
            </Row>
            <Row style={{ margin: '8px 16px 8px 16px' }}>
                <Col xs={12} sm={12} md={7}>
                    <p style={{ marginBlockStart: 12, marginBlockEnd: 12, fontWeight: 'bold', color: '#485460' }}>My Tasks</p>
                </Col>
                <Col style={{ padding: 0 }} xs={12} sm={12} md={5} >
                    <Row>
                        <Col xs={12} sm={12} md={8}>
                            <FormInput placeholder="Search task by name..." backgroundColor="white" onChange={searchTasks} />
                        </Col>
                        <Col xs={12} sm={12} md={4}>
                            <FormButton title="+ New Task" onPress={addTask} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div style={{ backgroundColor: 'white', margin: '8px 16px 8px 16px', borderRadius: 12, padding: 8 }}>
                {
                    tasks?.map((task, index) => {
                        return <TaskItem key={index} task={task} handlerChange={handlerChange} taskUpdating={taskUpdating} editTask={editTask(task)} deleteTask={deleteTask(task.id)} />
                    })
                }
            </div>
        </ >
    )
}

const Modal = ({ show, setVisible, content }) => {
    const dismiss = (e) => () => {
        e.preventDefault();
        setVisible(false);
    }

    return (
        <div
            style={{
                display: show ? 'block' : 'none'
            }}
            onClick={dismiss}>
            {content}
        </div >
    )
}

export default connect(mapStateToProps, null)(Dashboard);