'use client';
import React, { useState } from 'react';
import './mission.scss';
import { Mission, Task, LogEntry } from '../types/type';

const Page = () => {
    const [statusFilter, setStatusFilter] = useState('전체 상태');
    const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
    
    const missionData: Mission[] = [
        { id: 'MIS-0001', name: '차량 바디 조립', status: '진행', statusClass: 'progress', progress: '33%', progressDetail: '(1/3 완료됨)', progressClass: '', device: 'AMR-A01-0001 외 5개', schedule: '-', update: '2025-12-19 T08:30:00' },
        { id: 'MIS-0002', name: '엔진 설치', status: '대기', statusClass: 'wait', progress: '0%', progressDetail: '(0/3 진행전)', progressClass: 'zero', device: 'AMR-A01-0001 외 2개', schedule: '2025-12-19 T08:30:00', update: '2025-12-19 T08:30:00' },
        { id: 'MIS-0003', name: '도어 조립', status: '완료', statusClass: 'complete', progress: '100%', progressDetail: '(4/4 완료됨)', progressClass: 'full', device: 'AMR-A01-0001 외 5개', schedule: '-', update: '2025-12-19 T08:30:00' },
        { id: 'MIS-0004', name: '도장 공정', status: '대기', statusClass: 'wait', progress: '0%', progressDetail: '(0/4 진행전)', progressClass: 'zero', device: 'AMR-A01-0001 외 5개', schedule: '2025-12-19 T08:30:00', update: '2025-12-19 T08:30:00' },
        { id: 'MIS-0005', name: '바퀴 조립', status: '진행', statusClass: 'progress', progress: '66%', progressDetail: '(2/3 완료됨)', progressClass: '', device: 'AMR-A01-0001 외 5개', schedule: '-', update: '2025-12-19 T08:30:00' },
        { id: 'MIS-0006', name: '검수', status: '중지', statusClass: 'stop', progress: '50%', progressDetail: '(1/2 완료됨)', progressClass: 'half', device: 'AMR-A01-0001 외 5개', schedule: '-', update: '2025-12-19 T08:30:00' },
        { id: 'MIS-0007', name: '전장품 설치', status: '취소', statusClass: 'cancel', progress: '0%', progressDetail: '(0/3 진행전)', progressClass: 'zero', device: 'AMR-A01-0001 외 5개', schedule: '-', update: '2025-12-19 T08:30:00' },
        { id: 'MIS-0008', name: '선적 준비', status: '진행', statusClass: 'progress', progress: '66%', progressDetail: '(2/3 완료됨)', progressClass: '', device: 'AMR-A01-0001 외 5개', schedule: '-', update: '2025-12-19 T08:30:00' },
        { id: 'MIS-0009', name: '조립 완료 점검', status: '대기', statusClass: 'wait', progress: '0%', progressDetail: '(0/2 진행전)', progressClass: 'zero', device: 'AMR-A01-0001 외 5개', schedule: '2025-12-19 T08:30:00', update: '2025-12-19 T08:30:00' },
        { id: 'MIS-0010', name: '프레임 조립', status: '예약', statusClass: 'reserve', progress: '0%', progressDetail: '(0/2 진행전)', progressClass: 'zero', device: 'AMR-A01-0001 외 5개', schedule: '2025-12-19 T08:30:00', update: '2025-12-19 T08:30:00' },
        { id: 'MIS-0011', name: '트랜스미션 설치', status: '완료', statusClass: 'complete', progress: '100%', progressDetail: '(3/3 완료됨)', progressClass: 'full', device: 'AMR-A01-0001 외 5개', schedule: '-', update: '2025-12-19 T08:30:00' },
        { id: 'MIS-0012', name: '도어 테스트', status: '취소', statusClass: 'cancel', progress: '0%', progressDetail: '(0/1 진행전)', progressClass: 'zero', device: 'AMR-A01-0001 외 5개', schedule: '-', update: '2025-12-19 T08:30:00' },
        { id: 'MIS-0013', name: '엔진 시동 테스트', status: '진행', statusClass: 'progress', progress: '33%', progressDetail: '(1/3 완료됨)', progressClass: '', device: 'AMR-A01-0001 외 5개', schedule: '-', update: '2025-12-19 T08:30:00' },
        { id: 'MIS-0014', name: '용접 로봇 유지 보수', status: '대기', statusClass: 'wait', progress: '0%', progressDetail: '(0/3 진행전)', progressClass: 'zero', device: 'AMR-A01-0001 외 5개', schedule: '2025-12-19 T08:30:00', update: '2025-12-19 T08:30:00' },
        { id: 'MIS-0015', name: '스팟 재고 이동', status: '예약', statusClass: 'reserve', progress: '0%', progressDetail: '(0/3 진행전)', progressClass: 'zero', device: 'AMR-A01-0001 외 5개', schedule: '-', update: '2025-12-19 T08:30:00' },
    ];

    // 작업 순서 타임라인 데이터
    const taskData: Task[] = [
        { 
            id: 1, 
            name: '엔진 이동', 
            description: '엔진을 작업장으로 이동',
            status: '완료됨',
            statusClass: 'complete',
            devices: [
                { type: 'amr', id: 'AMR-A01-0003' },
                { type: 'flt', id: 'FLT-C01-0001' }
            ]
        },
        { 
            id: 2, 
            name: '엔진 설치', 
            description: '차량에 엔진을 설치',
            status: '진행중',
            statusClass: 'progress',
            devices: [
                { type: 'arm', id: 'ARM-R10-0003' }
            ]
        },
        { 
            id: 3, 
            name: '볼트 체결', 
            description: '엔진 체결 볼트 조립',
            status: '대기중',
            statusClass: 'wait',
            devices: [
                { type: 'arm', id: 'ARM-R10-0003' }
            ]
        },
    ];

    // 상태 로그 데이터
    const logData: LogEntry[] = [
        { time: '2025-12-18 09:00', description: '미션 생성' },
        { time: '2025-12-18 09:00', description: '엔진 이동 완료' },
        { time: '2025-12-18 09:00', description: '엔진 설치 시작' },
        { time: '2025-12-18 09:00', description: '미션 예약됨' },
        { time: '2025-12-18 09:00', description: '미션 예약됨' },
        { time: '2025-12-18 09:00', description: '미션 예약됨' },
        { time: '2025-12-18 09:00', description: '미션 예약됨' },
        { time: '2025-12-18 09:00', description: '미션 예약됨' },
        { time: '2025-12-18 09:00', description: '미션 예약됨' },
    ];

    // 필터링된 미션 데이터
    const filteredMissionData = statusFilter === '전체 상태' 
        ? missionData 
        : missionData.filter(mission => mission.status === statusFilter);

    const handleMissionClick = (mission: Mission) => {
        setSelectedMission(mission);
    };

    return (
        <div className="mission">
            <div className="leftPanel">
                <div className="headerWrap">
                    <div className="searchBox">
                        <img src="/images/search.svg" className="searchIcon" />
                        <input type="text" placeholder="미션 ID, 미션명 검색" className="searchInput" />
                    </div>
                    <div className="filterBox">
                        <select className="statusSelect" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="전체 상태">전체 상태</option>
                            <option value="진행">진행</option>
                            <option value="대기">대기</option>
                            <option value="완료">완료</option>
                            <option value="중지">중지</option>
                            <option value="취소">취소</option>
                            <option value="예약">예약</option>
                        </select>
                        <button className="runningBtn">
                            <span className="dot"></span>
                            실행중만
                        </button>
                    </div>
                    <button className="createBtn">+ 미션 생성</button>
                </div>
                <div className="tableWrap">
                    <table className="missionTable">
                        <thead>
                            <tr>
                                <th>미션 ID</th>
                                <th>미션명</th>
                                <th>상태</th>
                                <th>진행률</th>
                                <th>할당 장치</th>
                                <th>스케줄</th>
                                <th>업데이트</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMissionData.map((mission) => (
                                <tr 
                                    key={mission.id} 
                                    onClick={() => handleMissionClick(mission)}
                                    className={selectedMission?.id === mission.id ? 'selected' : ''}
                                >
                                    <td className="missionId">{mission.id}</td>
                                    <td className="missionName">{mission.name}</td>
                                    <td>
                                        <span className={`statusBadge ${mission.statusClass}`}>{mission.status}</span>
                                    </td>
                                    <td className="progressCell">
                                        <span className={`progressValue ${mission.progressClass}`}>{mission.progress}</span>
                                        <span className="progressDetail">{mission.progressDetail}</span>
                                    </td>
                                    <td className="deviceCell">{mission.device}</td>
                                    <td className="scheduleCell">{mission.schedule}</td>
                                    <td className="updateCell">{mission.update}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="tableFooter">
                        <span className="totalCount">총 {filteredMissionData.length}개의 미션</span>
                    </div>
                </div>
            </div>
            <div className="rightPanel">
                {selectedMission ? (
                    <>
                        <div className="detailHeader">
                            <div className="titleSection">
                                <h2 className="missionTitle">{selectedMission.id} / {selectedMission.name}</h2>
                                <span className="missionMeta">{selectedMission.status} / 업데이트 {selectedMission.update}</span>
                            </div>
                            <div className="actionBtns">
                                <button className="actionBtn">Start</button>
                                <button className="actionBtn">Pause</button>
                                <button className="actionBtn">Edit</button>
                                <button className="actionBtn">Reschedule</button>
                                <button className="actionBtn">Cancel</button>
                                <button className="actionBtn delete">Delete</button>
                            </div>
                        </div>
                        <div className="detailContent">
                            <div className="timelineSection">
                                <div className="sectionTitle">
                                    <span>작업 순서 타임라인</span>
                                    <span className="taskInfo">총 작업 3개 / 할당 장치 3개</span>
                                </div>
                                <div className="timeline">
                                    {taskData.map((task, index) => (
                                        <div key={task.id} className="taskItem">
                                            <div className={`taskCard ${task.statusClass}`}>
                                                <div className="taskHeader">
                                                    <span className="taskName">{task.name}</span>
                                                    <span className={`taskStatus ${task.statusClass}`}>{task.status}</span>
                                                </div>
                                                <p className="taskDesc">{task.description}</p>
                                                <div className="taskDevices">
                                                    {task.devices.map((device, idx) => (
                                                        <span key={idx} className={`deviceTag ${device.type}`}>
                                                            <span className="deviceIcon">🤖</span>
                                                            {device.id}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            {index < taskData.length - 1 && (
                                                <div className="connector">
                                                    <span className="arrow">↓</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="logSection">
                                <div className="sectionTitle">상태 로그</div>
                                <div className="logTable">
                                    <div className="logHeader">
                                        <span className="col time">Time</span>
                                        <span className="col desc">Description</span>
                                    </div>
                                    <div className="logBody">
                                        {logData.map((log, index) => (
                                            <div key={index} className="logRow">
                                                <span className="col time">{log.time}</span>
                                                <span className="col desc">{log.description}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="emptyState">
                        <span>미션을 선택해주세요</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;