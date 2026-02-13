import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEvent } from "../../context/EventContext";

const ProjectIngest = () => {
    const { projectId } = useParams();
    const { ingestEvent, loading, error, success, setError, setSuccess } = useEvent();

    const [formData, setFormData] = useState({
        service: "",
        severity: "INFO",
        message: "", 
        environment: "production", 
        metadata: "",
    });

    // Fix typo in handler name and ensure usage is consistent
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev, 
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError(null);
            setSuccess(null);

            let parsedMetadata = {};
            if (formData.metadata) {
                try {
                    parsedMetadata = JSON.parse(formData.metadata);
                } catch (err) {
                    setError("Invalid JSON in metadata field.", err);
                    return;
                }
            }

            await ingestEvent(projectId, {
                service: formData.service,
                severity: formData.severity,
                message: formData.message,
                environment: formData.environment,
                metadata: parsedMetadata,
            });
            setFormData({
                service: "",
                severity: "INFO", 
                message: "", 
                environment: "production",
                metadata: "",
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "40px auto" }}>
          <h2>Send Event to Project</h2>
    
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
    
          <form onSubmit={handleSubmit}>
            <div>
              <label>Service</label>
              <input
                type="text"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              />
            </div>
    
            <div>
              <label>Severity</label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
              >
                <option value="INFO">INFO</option>
                <option value="WARN">WARN</option>
                <option value="ERROR">ERROR</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>
    
            <div>
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
    
            <div>
              <label>Environment</label>
              <select
                name="environment"
                value={formData.environment}
                onChange={handleChange}
              >
                <option value="development">development</option>
                <option value="staging">staging</option>
                <option value="production">production</option>
              </select>
            </div>
    
            <div>
              <label>Metadata (JSON format)</label>
              <textarea
                name="metadata"
                value={formData.metadata}
                onChange={handleChange}
                placeholder='{"ip": "127.0.0.1"}'
              />
            </div>
    
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Event"}
            </button>
          </form>
        </div>
    );
};

export default ProjectIngest;