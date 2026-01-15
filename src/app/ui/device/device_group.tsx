'use client';
import React, { useState } from 'react';
import './device_group.scss';
import { Device } from '../../types/type';

interface DeviceGroupProps {
    deviceData: Device[];
}

interface GroupData {
    groupId: string;
    groupName: string;
    description: string;
    deviceCount: number;
}

// 그룹 설명 데이터
const groupDescriptions: { [key: string]: string } = {
    'A001': 'A동 1층 생산 라인 담당',
    'A002': 'A동 2층 조립 라인 담당',
    'B001': 'B동 창고 물류 관리',
    'C001': '메인 물류 라인 담당',
    'M001': '본관 자동화 시스템 관리',
    'NA00': '그룹 미할당 장치',
};

const DeviceGroup = ({ deviceData }: DeviceGroupProps) => {
    const [selectedGroup, setSelectedGroup] = useState<GroupData | null>(null);

    // deviceData를 그룹별로 집계
    const groupMap = new Map<string, { groupId: string; groupName: string; count: number }>();
    
    deviceData.forEach(device => {
        const key = device.groupId;
        if (groupMap.has(key)) {
            groupMap.get(key)!.count++;
        } else {
            groupMap.set(key, {
                groupId: device.groupId,
                groupName: device.group,
                count: 1,
            });
        }
    });

    // 그룹 데이터 배열 생성
    const groupData: GroupData[] = Array.from(groupMap.values()).map(item => ({
        groupId: item.groupId,
        groupName: item.groupName,
        description: groupDescriptions[item.groupId] || '',
        deviceCount: item.count,
    }));

    // 그룹 ID 기준으로 정렬
    groupData.sort((a, b) => a.groupId.localeCompare(b.groupId));

    // 선택된 그룹의 디바이스 목록
    const selectedGroupDevices = selectedGroup 
        ? deviceData.filter(device => device.groupId === selectedGroup.groupId)
        : [];

    const handleGroupClick = (group: GroupData) => {
        setSelectedGroup(group);
    };

    return (
        <div className="device_group">
            <div className="leftPanel">
                <div className="panelHeader">
                    <h2 className="panelTitle">전체 장치 목록</h2>
                </div>
                <div className="tableWrap">
                    <table className="groupTable">
                        <thead>
                            <tr>
                                <th className="colGroupId">그룹 ID</th>
                                <th className="colGroupName">그룹명</th>
                                <th className="colDeviceCount">장치 수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupData.map((group) => (
                                <tr 
                                    key={group.groupId}
                                    className={selectedGroup?.groupId === group.groupId ? 'selected' : ''}
                                    onClick={() => handleGroupClick(group)}
                                >
                                    <td className="groupId">{group.groupId}</td>
                                    <td className="groupName">{group.groupName}</td>
                                    <td className="deviceCount">{group.deviceCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="tableFooter">
                    <span className="totalCount">총 {groupData.length}개의 그룹</span>
                </div>
            </div>
            <div className="rightPanel">
                {selectedGroup ? (
                    <div className="groupDetail">
                        <div className="detailHeader">
                            <h2 className="detailTitle">그룹 상세 정보</h2>
                        </div>
                        <div className="detailContent">
                            <h3 className="groupNameTitle">{selectedGroup.groupName}</h3>
                            
                            <h4 className="sectionTitle">그룹 기본 정보</h4>
                            <div className="infoSection">
                                <div className="infoRow">
                                    <span className="label">그룹 ID</span>
                                    <span className="value">{selectedGroup.groupId}</span>
                                </div>
                                <div className="infoRow">
                                    <span className="label">그룹명</span>
                                    <span className="value">{selectedGroup.groupName}</span>
                                </div>
                                <div className="infoRow">
                                    <span className="label">설명</span>
                                    <span className="value">{selectedGroup.description}</span>
                                </div>
                            </div>

                            <h4 className="sectionTitle">그룹 장치 목록 ({selectedGroupDevices.length}대)</h4>
                            <div className="deviceSection">
                                <div className="deviceList">
                                    {selectedGroupDevices.map((device) => (
                                        <div key={device.id} className="deviceRow">
                                            <span className="deviceId">{device.id}</span>
                                            <span className="deviceModel">{device.modelName}</span>
                                            <span className={`deviceStatus ${device.statusClass}`}>{device.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="detailFooter">
                            <button className="assignBtn">장치 할당/해제</button>
                            <div className="actionBtns">
                                <button className="cancelBtn">취소</button>
                                <button className="deleteBtn">그룹 삭제</button>
                                <button className="saveBtn">저장</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="emptyState">
                        <p>그룹을 선택하면 상세 정보가 표시됩니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeviceGroup;