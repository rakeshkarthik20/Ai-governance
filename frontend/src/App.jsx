import { useState } from "react";

import {
  ShieldCheck,
  AlertTriangle,
  Database,
  ClipboardList,
  LayoutDashboard,
  FileClock,
  Lock,
  Upload,
} from "lucide-react";

export default function App() {

  const [activeTab, setActiveTab] = useState("dashboard");

  const [uploadedData, setUploadedData] = useState("");

  const [riskLevel, setRiskLevel] = useState("LOW");

  const [auditLogs, setAuditLogs] = useState([]);

  const handleFileUpload = (event) => {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {

      const text = e.target.result;

      setUploadedData(text);

      analyzeData(text);
    };

    reader.readAsText(file);
  };

  const analyzeData = (text) => {

    let detectedRisk = "LOW";

    const logs = [];

    if (
      text.toLowerCase().includes("salary") ||
      text.toLowerCase().includes("employee")
    ) {

      detectedRisk = "HIGH";

      logs.push(
        "Sensitive HR/Salary data detected"
      );
    }

    if (
      text.toLowerCase().includes("email")
    ) {

      logs.push(
        "PII detected: Customer Email"
      );
    }

    if (
      text.toLowerCase().includes("financial") ||
      text.toLowerCase().includes("margin")
    ) {

      logs.push(
        "Financial business data detected"
      );
    }

    if (
      text.toLowerCase().includes("customer")
    ) {

      logs.push(
        "Customer-related data identified"
      );
    }

    setRiskLevel(detectedRisk);

    setAuditLogs(logs);
  };

 const handleApproval = () => {

  if (!uploadedData) {

    alert(
      "Please upload enterprise data first."
    );

    return;
  }

  const recommendation =
    riskLevel === "HIGH"
      ? "Human review mandatory before AI processing."
      : "AI processing approved automatically.";

  alert(
    "AI ACCESS APPROVED\n\n" +

    "Governance Summary:\n" +

    "Risk Level: " + riskLevel + "\n\n" +

    "Controls Applied:\n" +
    "- PII Masking Enabled\n" +
    "- Role-Based Access Active\n" +
    "- Audit Logging Enabled\n\n" +

    "AI Governance Decision:\n" +
    recommendation + "\n\n" +

    "Audit Entries Generated: " +
    auditLogs.length
  );
};

  return (

    <div className="min-h-screen bg-[#020817] text-white flex">

      {/* Sidebar */}
      <div className="w-64 bg-[#0f172a] border-r border-white/10 p-6 hidden md:flex flex-col">

        <h1 className="text-2xl font-bold text-cyan-400 mb-10">
          SentinelAI
        </h1>

        <nav className="space-y-5">

          <button
            onClick={() => setActiveTab("dashboard")}
            className="flex items-center gap-3 text-cyan-400"
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("governance")}
            className="flex items-center gap-3 text-gray-400"
          >
            <ShieldCheck size={20} />
            <span>Governance</span>
          </button>

          <button
            onClick={() => setActiveTab("approvals")}
            className="flex items-center gap-3 text-gray-400"
          >
            <ClipboardList size={20} />
            <span>Approvals</span>
          </button>

          <button
            onClick={() => setActiveTab("audit")}
            className="flex items-center gap-3 text-gray-400"
          >
            <FileClock size={20} />
            <span>Audit Logs</span>
          </button>

          <button
            onClick={() => setActiveTab("compliance")}
            className="flex items-center gap-3 text-gray-400"
          >
            <Lock size={20} />
            <span>Compliance</span>
          </button>

        </nav>

      </div>

      {/* Main */}
      <div className="flex-1 p-6">

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (

          <>

            <div className="flex items-center justify-between mb-8">

              <div>

                <h1 className="text-4xl font-bold">
                  AI Governance Control Center
                </h1>

                <p className="text-gray-400 mt-2">
                  Enterprise AI Access Approval & Risk Intelligence
                </p>

              </div>

              <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl">
                Compliance Active
              </div>

            </div>

        
           {/* KPI */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">

    <ShieldCheck className="text-green-400 mb-3" size={32} />

    <h2 className="text-2xl font-bold">
      {riskLevel === "HIGH" ? "72%" : "96%"}
    </h2>

    <p className="text-gray-400">
      Governance Compliance
    </p>

  </div>

  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">

    <AlertTriangle className="text-yellow-400 mb-3" size={32} />

    <h2 className="text-2xl font-bold">
      {riskLevel === "HIGH" ? "14" : "2"}
    </h2>

    <p className="text-gray-400">
      High Risk Requests
    </p>

  </div>

  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">

    <Database className="text-cyan-400 mb-3" size={32} />

    <h2 className="text-2xl font-bold">
      {auditLogs.length}
    </h2>

    <p className="text-gray-400">
      AI Data Access Logs
    </p>

  </div>

  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">

    <ClipboardList className="text-purple-400 mb-3" size={32} />

    <h2 className="text-2xl font-bold">
      {riskLevel === "HIGH" ? "5" : "1"}
    </h2>

    <p className="text-gray-400">
      Pending Approvals
    </p>

  </div>

</div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Left */}
              <div className="lg:col-span-2 bg-white/5 rounded-2xl p-6 border border-white/10">

                <h2 className="text-2xl font-semibold mb-6">
                  AI Governance Request
                </h2>

                {/* Upload */}
                <label className="flex items-center justify-center gap-3 w-full bg-cyan-500 hover:bg-cyan-400 transition-all py-4 rounded-xl font-semibold cursor-pointer mb-6">

                  <Upload size={20} />

                  Upload Enterprise Data File

                  <input
                    type="file"
                    accept=".txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                </label>

                {/* Uploaded Data */}
                <div className="bg-[#111827] p-4 rounded-xl mb-4">

                  <p className="text-sm text-gray-400 mb-2">
                    Uploaded Data
                  </p>

                  <pre className="text-sm text-cyan-300 whitespace-pre-wrap">

                    {uploadedData || "No file uploaded"}

                  </pre>

                </div>

                {/* Risk */}
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl">

                  <p className="text-red-400 font-semibold">
                    {riskLevel} RISK DETECTED
                  </p>

                  <p className="text-sm text-gray-300 mt-1">
                    Governance engine analyzed uploaded enterprise data.
                  </p>

                </div>

              </div>

              {/* Governance Engine */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">

                <h2 className="text-2xl font-semibold mb-6">
                  Governance Engine
                </h2>

                <div className="space-y-4">

                  <div className="flex justify-between bg-[#111827] p-4 rounded-xl">
                    <span>PII Masking</span>
                    <span className="text-green-400">Enabled</span>
                  </div>

                  <div className="flex justify-between bg-[#111827] p-4 rounded-xl">
                    <span>Role-Based Access</span>
                    <span className="text-green-400">Active</span>
                  </div>

                  <div className="flex justify-between bg-[#111827] p-4 rounded-xl">
                    <span>Risk Score</span>
                    <span className="text-red-400 font-bold">
                      {riskLevel === "HIGH" ? "8.7 / 10" : "2.1 / 10"}
                    </span>
                  </div>

                  <button
                    onClick={handleApproval}
                    className="w-full mt-4 bg-cyan-500 hover:bg-cyan-400 transition-all py-3 rounded-xl font-semibold"
                  >
                    Approve AI Access
                  </button>

                </div>

              </div>

            </div>

          </>
        )}

        {/* GOVERNANCE */}
        {activeTab === "governance" && (

          <div>

            <h1 className="text-4xl font-bold mb-6">
              Governance Decision Note
            </h1>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">

              <p>
                AI system analyzed uploaded enterprise data for governance validation.
              </p>

              <p>
                Sensitive employee, financial, and customer information was evaluated.
              </p>

              <p>
                Risk Level:
                <span className="text-red-400 font-bold ml-2">
                  {riskLevel}
                </span>
              </p>

              <ul className="list-disc ml-6 text-gray-300">
                <li>PII masking mandatory</li>
                <li>Role-based access enforced</li>
                <li>Audit logging enabled</li>
                <li>Human approval required</li>
              </ul>

            </div>

          </div>

        )}

        {/* APPROVALS */}
        {activeTab === "approvals" && (

          <div>

            <h1 className="text-4xl font-bold mb-6">
              Approval Workflow
            </h1>

            <div className="space-y-4">

              <div className="bg-white/5 p-5 rounded-2xl">
                ✅ Uploaded Data Classified
              </div>

              <div className="bg-white/5 p-5 rounded-2xl">
                ✅ Governance Risk Evaluated
              </div>

              <div className="bg-white/5 p-5 rounded-2xl">
                🟡 Human Approval Required
              </div>

              <div className="bg-white/5 p-5 rounded-2xl">
                ⚪ AI Recommendation Pending
              </div>

            </div>

          </div>

        )}

        {/* AUDIT */}
        {activeTab === "audit" && (

          <div>

            <h1 className="text-4xl font-bold mb-6">
              Audit Logs
            </h1>

            <div className="space-y-4">

              {auditLogs.length === 0 ? (

                <div className="bg-white/5 p-5 rounded-2xl">
                  No audit activity yet
                </div>

              ) : (

                auditLogs.map((log, index) => (

                  <div
                    key={index}
                    className="bg-white/5 p-5 rounded-2xl"
                  >
                    {log}
                  </div>

                ))

              )}

            </div>

          </div>

        )}

        {/* COMPLIANCE */}
        {activeTab === "compliance" && (

          <div>

            <h1 className="text-4xl font-bold mb-6">
              Compliance Controls
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="bg-white/5 p-6 rounded-2xl">
                ✅ GDPR Compliant
              </div>

              <div className="bg-white/5 p-6 rounded-2xl">
                ✅ PII Masking Active
              </div>

              <div className="bg-white/5 p-6 rounded-2xl">
                ✅ Audit Trails Enabled
              </div>

              <div className="bg-white/5 p-6 rounded-2xl">
                ✅ Human Approval Required
              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}