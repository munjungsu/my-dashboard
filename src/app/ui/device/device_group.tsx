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

interface NewGroupForm {
    groupId: string;
    groupName: string;
    description: string;
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
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isAssignPopupOpen, setIsAssignPopupOpen] = useState(false);
    const [newGroup, setNewGroup] = useState<NewGroupForm>({ groupId: '', groupName: '', description: '' });
    const [customGroups, setCustomGroups] = useState<GroupData[]>([]);
    const [deletedGroupIds, setDeletedGroupIds] = useState<string[]>([]);
    
    // 장치 할당 관련 상태
    const [deviceAssignments, setDeviceAssignments] = useState<Map<string, string>>(new Map());
    const [selectedUnassigned, setSelectedUnassigned] = useState<string[]>([]);
    const [selectedAssigned, setSelectedAssigned] = useState<string[]>([]);
    const [tempAssignments, setTempAssignments] = useState<Map<string, string>>(new Map());

    // 장치의 현재 그룹 ID를 가져오는 함수 (할당 정보 반영)
    const getDeviceCurrentGroupId = (device: Device) => {
        return deviceAssignments.get(device.id) ?? device.groupId;
    };

    // deviceData를 그룹별로 집계 (할당 정보 반영)
    const groupMap = new Map<string, { groupId: string; groupName: string; count: number }>();
    
    deviceData.forEach(device => {
        const currentGroupId = getDeviceCurrentGroupId(device);
        if (groupMap.has(currentGroupId)) {
            groupMap.get(currentGroupId)!.count++;
        } else {
            // 원본 그룹 정보 또는 device의 group 사용
            const groupName = deviceData.find(d => d.groupId === currentGroupId)?.group || currentGroupId;
            groupMap.set(currentGroupId, {
                groupId: currentGroupId,
                groupName: groupName,
                count: 1,
            });
        }
    });

    // 커스텀 그룹의 장치 수 계산
    const customGroupsWithCount = customGroups.map(group => ({
        ...group,
        deviceCount: deviceData.filter(d => getDeviceCurrentGroupId(d) === group.groupId).length,
    }));

    // 그룹 데이터 배열 생성 (삭제된 그룹 제외)
    const groupData: GroupData[] = [
        ...Array.from(groupMap.values())
            .filter(item => !deletedGroupIds.includes(item.groupId))
            .filter(item => !customGroups.some(cg => cg.groupId === item.groupId)) // 커스텀 그룹 중복 제거
            .map(item => ({
                groupId: item.groupId,
                groupName: item.groupName,
                description: groupDescriptions[item.groupId] || '',
                deviceCount: item.count,
            })),
        ...customGroupsWithCount.filter(group => !deletedGroupIds.includes(group.groupId)),
    ];

    // 그룹 ID 기준으로 정렬
    groupData.sort((a, b) => a.groupId.localeCompare(b.groupId));

    // 팝업에서 임시 할당 정보를 포함한 그룹 ID 가져오기
    const getDeviceGroupIdWithTemp = (device: Device) => {
        return tempAssignments.get(device.id) ?? deviceAssignments.get(device.id) ?? device.groupId;
    };

    // 선택된 그룹의 디바이스 목록 (저장된 할당 정보 반영)
    const selectedGroupDevices = selectedGroup 
        ? deviceData.filter(device => getDeviceCurrentGroupId(device) === selectedGroup.groupId)
        : [];

    // 할당 팝업용 - 현재 그룹에 할당된 장치 (임시 할당 포함)
    const assignedDevices = selectedGroup
        ? deviceData.filter(device => getDeviceGroupIdWithTemp(device) === selectedGroup.groupId)
        : [];

    // 할당 팝업용 - 다른 그룹 또는 미할당 장치 (임시 할당 포함)
    const unassignedDevices = selectedGroup
        ? deviceData.filter(device => getDeviceGroupIdWithTemp(device) !== selectedGroup.groupId)
        : [];

    const handleGroupClick = (group: GroupData) => {
        setSelectedGroup(group);
    };

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
        setNewGroup({ groupId: '', groupName: '', description: '' });
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setNewGroup({ groupId: '', groupName: '', description: '' });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewGroup(prev => ({ ...prev, [name]: value }));
    };

    const handleAddGroup = () => {
        if (!newGroup.groupId.trim() || !newGroup.groupName.trim()) {
            alert('그룹 ID와 그룹명을 모두 입력해주세요.');
            return;
        }

        // 중복 체크
        const isDuplicate = groupData.some(g => g.groupId === newGroup.groupId);
        if (isDuplicate) {
            alert('이미 존재하는 그룹 ID입니다.');
            return;
        }

        const newGroupData: GroupData = {
            groupId: newGroup.groupId,
            groupName: newGroup.groupName,
            description: newGroup.description,
            deviceCount: 0,
        };

        setCustomGroups(prev => [...prev, newGroupData]);
        handleClosePopup();
    };

    const handleDeleteGroup = () => {
        if (!selectedGroup) return;

        const confirmDelete = window.confirm(
            `"${selectedGroup.groupName}" 그룹을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`
        );

        if (confirmDelete) {
            setDeletedGroupIds(prev => [...prev, selectedGroup.groupId]);
            setSelectedGroup(null);
        }
    };

    // 장치 할당 팝업 열기
    const handleOpenAssignPopup = () => {
        if (!selectedGroup) return;
        setTempAssignments(new Map(deviceAssignments));
        setSelectedUnassigned([]);
        setSelectedAssigned([]);
        setIsAssignPopupOpen(true);
    };

    // 장치 할당 팝업 닫기
    const handleCloseAssignPopup = () => {
        setIsAssignPopupOpen(false);
        setTempAssignments(new Map());
        setSelectedUnassigned([]);
        setSelectedAssigned([]);
    };

    // 미할당 목록에서 장치 선택/해제
    const handleSelectUnassigned = (deviceId: string) => {
        setSelectedUnassigned(prev => 
            prev.includes(deviceId) 
                ? prev.filter(id => id !== deviceId)
                : [...prev, deviceId]
        );
    };

    // 할당된 목록에서 장치 선택/해제
    const handleSelectAssigned = (deviceId: string) => {
        setSelectedAssigned(prev => 
            prev.includes(deviceId) 
                ? prev.filter(id => id !== deviceId)
                : [...prev, deviceId]
        );
    };

    // 선택한 장치를 현재 그룹으로 할당
    const handleAssignDevices = () => {
        if (!selectedGroup || selectedUnassigned.length === 0) return;
        
        const newTempAssignments = new Map(tempAssignments);
        selectedUnassigned.forEach(deviceId => {
            newTempAssignments.set(deviceId, selectedGroup.groupId);
        });
        setTempAssignments(newTempAssignments);
        setSelectedUnassigned([]);
    };

    // 선택한 장치를 현재 그룹에서 해제 (원래 그룹으로)
    const handleUnassignDevices = () => {
        if (!selectedGroup || selectedAssigned.length === 0) return;
        
        const newTempAssignments = new Map(tempAssignments);
        selectedAssigned.forEach(deviceId => {
            const originalDevice = deviceData.find(d => d.id === deviceId);
            if (originalDevice) {
                // 원래 그룹으로 되돌리거나 미할당 상태로
                newTempAssignments.set(deviceId, originalDevice.groupId);
            }
        });
        setTempAssignments(newTempAssignments);
        setSelectedAssigned([]);
    };

    // 할당 저장
    const handleSaveAssignments = () => {
        setDeviceAssignments(new Map(tempAssignments));
        handleCloseAssignPopup();
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
                    <button onClick={handleOpenPopup}>그룹 추가</button>
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
                            <button className="assignBtn" onClick={handleOpenAssignPopup}>장치 할당/해제</button>
                            <div className="actionBtns">
                                <button className="cancelBtn" onClick={() => setSelectedGroup(null)}>취소</button>
                                <button className="deleteBtn" onClick={handleDeleteGroup}>그룹 삭제</button>
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

            {/* 그룹 추가 팝업 */}
            {isPopupOpen && (
                <div className="popupOverlay" onClick={handleClosePopup}>
                    <div className="popupContent" onClick={(e) => e.stopPropagation()}>
                        <div className="popupHeader">
                            <h3>그룹 추가</h3>
                            <button className="closeBtn" onClick={handleClosePopup}>×</button>
                        </div>
                        <div className="popupBody">
                            <div className="formGroup">
                                <label htmlFor="groupId">그룹 ID</label>
                                <input
                                    type="text"
                                    id="groupId"
                                    name="groupId"
                                    value={newGroup.groupId}
                                    onChange={handleInputChange}
                                    placeholder="예: A003"
                                />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="groupName">그룹명</label>
                                <input
                                    type="text"
                                    id="groupName"
                                    name="groupName"
                                    value={newGroup.groupName}
                                    onChange={handleInputChange}
                                    placeholder="예: A동 3층"
                                />
                            </div>
                             <div className="formGroup">
                                <label htmlFor="groupName">그룹 설명</label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={newGroup.description}
                                    onChange={handleInputChange}
                                    placeholder="예: A동 3층 조립 라인 담당"
                                />
                            </div>
                        </div>
                        <div className="popupFooter">
                            <button className="cancelBtn" onClick={handleClosePopup}>취소</button>
                            <button className="confirmBtn" onClick={handleAddGroup}>추가</button>
                        </div>
                    </div>
                </div>
            )}

            {/* 장치 할당/해제 팝업 */}
            {isAssignPopupOpen && selectedGroup && (
                <div className="popupOverlay" onClick={handleCloseAssignPopup}>
                    <div className="assignPopupContent" onClick={(e) => e.stopPropagation()}>
                        <div className="popupHeader">
                            <h3>장치 할당/해제 : {selectedGroup.groupName}</h3>
                            <button className="closeBtn" onClick={handleCloseAssignPopup}>×</button>
                        </div>
                        <div className="assignPopupBody">
                            <div className="deviceListSection">
                                <h4>미할당/다른 그룹 장치</h4>
                                <div className="deviceListBox">
                                    {unassignedDevices.map(device => (
                                        <div 
                                            key={device.id} 
                                            className={`deviceItem ${selectedUnassigned.includes(device.id) ? 'selected' : ''}`}
                                            onClick={() => handleSelectUnassigned(device.id)}
                                        >
                                            <span className="deviceId">{device.id}</span>
                                            <span className="deviceInfo">({device.modelName})</span>
                                            <span className="deviceGroup">[{device.group}]</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="transferButtons">
                                <button 
                                    className="transferBtn assign" 
                                    onClick={handleAssignDevices}
                                    disabled={selectedUnassigned.length === 0}
                                >
                                    할당 →
                                </button>
                                <button 
                                    className="transferBtn unassign" 
                                    onClick={handleUnassignDevices}
                                    disabled={selectedAssigned.length === 0}
                                >
                                    ← 해제
                                </button>
                            </div>
                            <div className="deviceListSection">
                                <h4>현재 그룹 장치</h4>
                                <div className="deviceListBox">
                                    {assignedDevices.map(device => (
                                        <div 
                                            key={device.id} 
                                            className={`deviceItem ${selectedAssigned.includes(device.id) ? 'selected' : ''}`}
                                            onClick={() => handleSelectAssigned(device.id)}
                                        >
                                            <span className="deviceId">{device.id}</span>
                                            <span className="deviceInfo">({device.modelName})</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="popupFooter">
                            <button className="cancelBtn" onClick={handleCloseAssignPopup}>취소</button>
                            <button className="confirmBtn" onClick={handleSaveAssignments}>할당 저장</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeviceGroup;