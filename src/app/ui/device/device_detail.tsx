'use client';
import React, { useState } from 'react';
import './device_detail.scss';
import { Device, DeviceDetailProps } from '../../types/type';

const DeviceDetailPage = ({ deviceData }: DeviceDetailProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
    
    // 폼 상태 관리
    const [formData, setFormData] = useState({
        group: 'A동 1층 그룹',
        workStatus: 'Charging',
        destinationChange: 'Charging_Station_A1'
    });

    const filteredDevices = deviceData.filter(device => 
        device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.modelName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeviceClick = (device: Device) => {
        setSelectedDevice(device);
        setFormData({
            group: device.group,
            workStatus: device.status,
            destinationChange: device.currentLocation
        });
    };

    return (
        <div className="device_detail">
            <div className="leftPanel">
                <div className="headerWrap">
                    <div className="searchBox">
                        <span className="searchIcon"><img src="/images/search.svg" /></span>
                        <input 
                            type="text" 
                            placeholder="ID, 모델명 검색" 
                            className="searchInput"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="registerBtn">+ 디바이스 등록</button>
                </div>
                <div className="tableWrap">
                    <table className="deviceTable">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>모델명</th>
                                <th>상태</th>
                                <th>그룹</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDevices.map((device) => (
                                <tr 
                                    key={device.id}
                                    onClick={() => handleDeviceClick(device)}
                                    className={selectedDevice?.id === device.id ? 'selected' : ''}
                                >
                                    <td className="deviceId">{device.id}</td>
                                    <td className="modelName">{device.modelName}</td>
                                    <td>
                                        <span className={`statusText ${device.statusClass}`}>{device.status}</span>
                                    </td>
                                    <td className="group">{device.group}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="tableFooter">
                    <span className="totalCount">총 {filteredDevices.length}개의 장치</span>
                </div>
            </div>
            <div className="rightPanel">
                {selectedDevice ? (
                    <div className="detailContent">
                        <h2 className="panelTitle">장치 상세 정보</h2>
                        <h3 className="deviceId">{selectedDevice.id}</h3>
                        
                        <div className="infoSection">
                            <h4 className="sectionTitle">기준 정보 수정</h4>
                            <div className="infoRow">
                                <span className="label">장치 ID</span>
                                <span className="value">{selectedDevice.id}</span>
                            </div>
                            <div className="infoRow">
                                <span className="label">모델명</span>
                                <span className="value">AMR-M300</span>
                            </div>
                            <div className="infoRow">
                                <span className="label">IP 주소</span>
                                <span className="value">192.168.1.12</span>
                            </div>
                            <div className="infoRow">
                                <span className="label">그룹 할당</span>
                                <select 
                                    className="selectInput"
                                    value={formData.group}
                                    onChange={(e) => setFormData({...formData, group: e.target.value})}
                                >
                                    <option value="A동 1층 그룹">A동 1층 그룹</option>
                                    <option value="A동 2층 그룹">A동 2층 그룹</option>
                                    <option value="B동 창고 그룹">B동 창고 그룹</option>
                                    <option value="C동 물류 센터">C동 물류 센터</option>
                                </select>
                            </div>
                            <div className="infoRow">
                                <span className="label">작업 상태</span>
                                <select 
                                    className="selectInput"
                                    value={formData.workStatus}
                                    onChange={(e) => setFormData({...formData, workStatus: e.target.value})}
                                >
                                    <option value="Move">Move</option>
                                    <option value="Charging">Charging</option>
                                    <option value="Stop">Stop</option>
                                    <option value="Ready">Ready</option>
                                    <option value="Error">Error</option>
                                    <option value="Alarm">Alarm</option>
                                </select>
                            </div>
                        </div>

                        <div className="locationSection">
                            <h4 className="sectionTitle">장치 위치 (실시간)</h4>
                            <div className="locationRow">
                                <div className="locationItem">
                                    <span className="label">현재 위치</span>
                                    <span className="value">{selectedDevice.currentLocation}</span>
                                </div>
                                <div className="locationItem">
                                    <span className="label">목적지 변경</span>
                                    <select 
                                        className="selectInput"
                                        value={formData.destinationChange}
                                        onChange={(e) => setFormData({...formData, destinationChange: e.target.value})}
                                    >
                                        <option value={selectedDevice.currentLocation}>{selectedDevice.currentLocation}</option>
                                        <option value="AREA_A_node_105">AREA_A_node_105</option>
                                        <option value="AREA_B_node_30">AREA_B_node_30</option>
                                        <option value="Charging_Station_A1">Charging_Station_A1</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mapSection">
                            <div className="mapPlaceholder"></div>
                        </div>

                        <div className="buttonWrap">
                            <button className="cancelBtn">취소</button>
                            <button className="saveBtn">정보 수정 및 저장</button>
                        </div>
                    </div>
                ) : (
                    <div className="emptyState">
                        <span>장치를 선택해주세요</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeviceDetailPage;