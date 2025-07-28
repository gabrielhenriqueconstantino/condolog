import React from "react";
import Sidebar from "../components/Sidebar";
import './Dashboard.css';
import { FiPlus, FiPackage } from "react-icons/fi";

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <Sidebar />
            
            <main className="main-content">
                <div className="buttons-container">
                    {/* Botão Cadastrar Encomenda */}
                    <button className="dashboard-button">
                        <div className="button-circle">
                            <FiPlus className="button-icon" />
                        </div>
                        <span className="button-text">Cadastrar encomenda</span>
                    </button>
                    
                    {/* Botão Entregar Encomenda */}
                    <button className="dashboard-button">
                        <div className="button-circle">
                            <FiPackage className="button-icon" />
                        </div>
                        <span className="button-text">Entregar encomenda</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;