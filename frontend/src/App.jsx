import { useEffect, useState } from "react";
import Login from "./Login";
import axios from "axios";
import "./App.css";

const API = "http://localhost:8080/api";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [assets, setAssets] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [editingAsset, setEditingAsset] = useState(null);

  const [requestSearch, setRequestSearch] = useState("");
const [requestPriorityFilter, setRequestPriorityFilter] = useState("ALL");

  const [asset, setAsset] = useState({
    assetTag: "",
    assetName: "",
    category: "Laptop",
    brand: "",
    model: "",
    serialNumber: "",
    status: "AVAILABLE",
    purchaseDate: "",
    assignedTo: "",
    department: ""
  });

  const [request, setRequest] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    status: "OPEN",
    requestedBy: ""
  });

 const loadData = async () => {
  setLoading(true);
  setError("");

  try {
    const assetResponse = await axios.get(`${API}/assets`, {
      params: {
        search: searchTerm || undefined,
        status:
          statusFilter === "ALL" ? undefined : statusFilter
      }
    });

    setAssets(assetResponse.data);
  } catch (error) {
    console.error("Could not load assets:", error);
    setError(
      "Unable to connect to the backend. Please make sure Spring Boot is running."
    );
  }

  try {
    const requestResponse = await axios.get(
      `${API}/service-requests`
    );

    setRequests(requestResponse.data);
  } catch (error) {
    console.error("Could not load service requests:", error);
    setError(
      "Unable to connect to the backend. Please make sure Spring Boot is running."
    );
  }

  setLoading(false);
};


  useEffect(() => {
  loadData();
}, [searchTerm, statusFilter]);

  const addAsset = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/assets`, asset);

      alert("Asset added successfully!");

      setAsset({
        assetTag: "",
        assetName: "",
        category: "Laptop",
        brand: "",
        model: "",
        serialNumber: "",
        status: "AVAILABLE",
        purchaseDate: "",
        assignedTo: "",
        department: ""
      });

      loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to add asset. Check the backend.");
    }
  };

  const deleteAsset = async (id) => {
    if (!window.confirm("Delete this asset?")) {
      return;
    }

    try {
      await axios.delete(`${API}/assets/${id}`);
      loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to delete asset.");
    }
  };

  const addRequest = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/service-requests`, request);

      alert("Service request created!");

      setRequest({
        title: "",
        description: "",
        priority: "MEDIUM",
        status: "OPEN",
        requestedBy: ""
      });

      loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to create service request.");
    }
  };

   const filteredRequests = requests.filter((r) => {
  const matchesSearch =
    r.title.toLowerCase().includes(requestSearch.toLowerCase()) ||
    (r.requestedBy || "")
      .toLowerCase()
      .includes(requestSearch.toLowerCase());

  const matchesPriority =
    requestPriorityFilter === "ALL" ||
    r.priority === requestPriorityFilter;

  return matchesSearch && matchesPriority;
});

const totalRequests = requests.length;

const openRequests = requests.filter(
  (r) => r.status === "OPEN"
).length;

const inProgressRequests = requests.filter(
  (r) => r.status === "IN_PROGRESS"
).length;

const resolvedRequests = requests.filter(
  (r) => r.status === "RESOLVED"
).length;
  const totalAssets = assets.length;

  const availableAssets = assets.filter(
    (a) => a.status === "AVAILABLE"
  ).length;

  const assignedAssets = assets.filter(
    (a) => a.status === "ASSIGNED"
  ).length;

  const maintenanceAssets = assets.filter(
    (a) => a.status === "UNDER_MAINTENANCE"
  ).length;

  const filteredAssets = assets.filter((a) => {
  const search = searchTerm.toLowerCase();

  const matchesSearch =
    a.assetTag?.toLowerCase().includes(search) ||
    a.assetName?.toLowerCase().includes(search) ||
    a.brand?.toLowerCase().includes(search) ||
    a.model?.toLowerCase().includes(search) ||
    a.serialNumber?.toLowerCase().includes(search) ||
    a.assignedTo?.toLowerCase().includes(search) ||
    a.department?.toLowerCase().includes(search);

  const matchesStatus =
    statusFilter === "ALL" || a.status === statusFilter;

  return matchesSearch && matchesStatus;
});

  if (!isLoggedIn) {
  return <Login onLogin={() => setIsLoggedIn(true)} />;
}

return (
    <div className="app">
            {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="sidebar-logo">
          <h2>IT Asset Hub</h2>
          <p>Enterprise Management</p>
        </div>

        <nav className="sidebar-nav">

          <button className="active">
            <span className="sidebar-icon">🏠</span>
            Dashboard
          </button>

          <button
            onClick={() =>
              document
                .querySelector(".panel:nth-of-type(3)")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="sidebar-icon">💻</span>
            Assets
          </button>

          <button
            onClick={() =>
              document
                .querySelector(".panel:last-of-type")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="sidebar-icon">🎫</span>
            Service Requests
          </button>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth"
              })
            }
          >
            <span className="sidebar-icon">📊</span>
            Reports
          </button>

          <button
            onClick={() =>
              alert("Settings module coming soon.")
            }
          >
            <span className="sidebar-icon">⚙️</span>
            Settings
          </button>

        </nav>

        <div className="sidebar-bottom">

          <div className="sidebar-user">

            <div className="user-avatar">
              O
            </div>

            <div className="user-info">
              <strong>Administrator</strong>
              <span>IT Operations</span>
            </div>

          </div>

        </div>

      </aside>

    {error && (
      <div className="alert alert-danger">
        ⚠️ {error}
      </div>
    )}
    {loading && (
  <div className="empty">
    Loading dashboard...
  </div>
)}

      {/* HEADER */}

      <header className="header">
        <div>
          <h1>IT Asset & Service Management</h1>
          <p>Enterprise IT Operations Dashboard</p>
        </div>

        <div className="system-status">
          <span className="status-dot"></span>
          System Online
        </div>
      </header>

      {/* DASHBOARD */}

      <section className="dashboard">

        <div className="stat-card">
          <div>
            <p>Total Assets</p>
            <h2>{totalAssets}</h2>
          </div>
          <span className="stat-icon">💻</span>
        </div>

        <div className="stat-card">
          <div>
            <p>Available</p>
            <h2>{availableAssets}</h2>
          </div>
          <span className="stat-icon">✓</span>
        </div>

        <div className="stat-card">
          <div>
            <p>Assigned</p>
            <h2>{assignedAssets}</h2>
          </div>
          <span className="stat-icon">👤</span>
        </div>

        <div className="stat-card">
          <div>
            <p>Maintenance</p>
            <h2>{maintenanceAssets}</h2>
          </div>
          <span className="stat-icon">🔧</span>
        </div>

      </section>
    <section className="dashboard">

  <div className="stat-card">
    <div>
      <p>Total Requests</p>
      <h2>{totalRequests}</h2>
    </div>
    <span className="stat-icon">🎫</span>
  </div>

  <div className="stat-card">
    <div>
      <p>Open Requests</p>
      <h2>{openRequests}</h2>
    </div>
    <span className="stat-icon">📂</span>
  </div>

  <div className="stat-card">
    <div>
      <p>In Progress</p>
      <h2>{inProgressRequests}</h2>
    </div>
    <span className="stat-icon">⚙️</span>
  </div>

  <div className="stat-card">
    <div>
      <p>Resolved</p>
      <h2>{resolvedRequests}</h2>
    </div>
    <span className="stat-icon">✅</span>
  </div>

</section>
<section className="panel">

  <div className="panel-header">
    <div>
      <h2>Asset Status Overview</h2>
      <p>Current distribution of IT assets</p>
    </div>
  </div>

  <div className="status-overview">

    <div className="overview-row">
      <span>Available</span>
      <div className="overview-bar">
        <div
          className="overview-fill available-fill"
          style={{
            width: totalAssets
              ? `${(availableAssets / totalAssets) * 100}%`
              : "0%"
          }}
        ></div>
      </div>
      <strong>{availableAssets}</strong>
    </div>

    <div className="overview-row">
      <span>Assigned</span>
      <div className="overview-bar">
        <div
          className="overview-fill assigned-fill"
          style={{
            width: totalAssets
              ? `${(assignedAssets / totalAssets) * 100}%`
              : "0%"
          }}
        ></div>
      </div>
      <strong>{assignedAssets}</strong>
    </div>

    <div className="overview-row">
      <span>Maintenance</span>
      <div className="overview-bar">
        <div
          className="overview-fill maintenance-fill"
          style={{
            width: totalAssets
              ? `${(maintenanceAssets / totalAssets) * 100}%`
              : "0%"
          }}
        ></div>
      </div>
      <strong>{maintenanceAssets}</strong>
    </div>

  </div>

</section>
      {/* ASSET FORM */}

      <section className="panel">

        <div className="panel-header">
          <div>
            <h2>Add New Asset</h2>
            <p>Register a new IT asset in the inventory</p>
          </div>
        </div>

        <form className="form-grid" onSubmit={addAsset}>

          <div className="form-group">
            <label>Asset Tag *</label>
            <input
              value={asset.assetTag}
              onChange={(e) =>
                setAsset({
                  ...asset,
                  assetTag: e.target.value
                })
              }
              placeholder="AST-002"
              required
            />
          </div>

          <div className="form-group">
            <label>Asset Name *</label>
            <input
              value={asset.assetName}
              onChange={(e) =>
                setAsset({
                  ...asset,
                  assetName: e.target.value
                })
              }
              placeholder="HP EliteBook 840"
              required
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              value={asset.category}
              onChange={(e) =>
                setAsset({
                  ...asset,
                  category: e.target.value
                })
              }
            >
              <option>Laptop</option>
              <option>Desktop</option>
              <option>Monitor</option>
              <option>Printer</option>
              <option>Mobile</option>
              <option>Network Equipment</option>
            </select>
          </div>

          <div className="form-group">
            <label>Brand *</label>
            <input
              value={asset.brand}
              onChange={(e) =>
                setAsset({
                  ...asset,
                  brand: e.target.value
                })
              }
              placeholder="Dell"
              required
            />
          </div>

          <div className="form-group">
            <label>Model *</label>
            <input
              value={asset.model}
              onChange={(e) =>
                setAsset({
                  ...asset,
                  model: e.target.value
                })
              }
              placeholder="Latitude 5440"
              required
            />
          </div>

          <div className="form-group">
            <label>Serial Number *</label>
            <input
              value={asset.serialNumber}
              onChange={(e) =>
                setAsset({
                  ...asset,
                  serialNumber: e.target.value
                })
              }
              placeholder="DL-5440-002"
              required
            />
          </div>

          <div className="form-group">
            <label>Status *</label>
            <select
              value={asset.status}
              onChange={(e) =>
                setAsset({
                  ...asset,
                  status: e.target.value
                })
              }
            >
              <option value="AVAILABLE">Available</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="UNDER_MAINTENANCE">
                Under Maintenance
              </option>
              <option value="RETIRED">Retired</option>
            </select>
          </div>

          <div className="form-group">
            <label>Purchase Date *</label>
            <input
              type="date"
              value={asset.purchaseDate}
              onChange={(e) =>
                setAsset({
                  ...asset,
                  purchaseDate: e.target.value
                })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Assigned To</label>
            <input
              value={asset.assignedTo}
              onChange={(e) =>
                setAsset({
                  ...asset,
                  assignedTo: e.target.value
                })
              }
              placeholder="Employee name"
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input
              value={asset.department}
              onChange={(e) =>
                setAsset({
                  ...asset,
                  department: e.target.value
                })
              }
              placeholder="IT"
            />
          </div>

          <div className="form-action">
            <button type="submit">
              + Add Asset
            </button>
          </div>

        </form>

      </section>

      {/* ASSET INVENTORY */}

      <section className="panel">

        <div className="panel-header">
          <div>
            <h2>Asset Inventory</h2>
            <p>Manage and monitor organizational IT assets</p>
          </div>
        </div>
        <div className="controls">
  <input
    type="text"
    placeholder="Search by asset name, tag, brand or serial number..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="ALL">All Statuses</option>
    <option value="AVAILABLE">Available</option>
    <option value="ASSIGNED">Assigned</option>
    <option value="UNDER_MAINTENANCE">Under Maintenance</option>
    <option value="RETIRED">Retired</option>
  </select>
</div>
 

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Asset Tag</th>
                <th>Asset</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {assets.length === 0 ? (

                <tr>
                  <td colSpan="8" className="empty">
                    No assets found
                  </td>
                </tr>

              ) : (

                filteredAssets.map((a) => (

                  <tr key={a.id}>

                    <td>
                      <strong>{a.assetTag}</strong>
                    </td>

                    <td>{a.assetName}</td>

                    <td>{a.category}</td>

                    <td>{a.brand}</td>

                    <td>
                      <span className={`badge ${a.status}`}>
                        {a.status.replace("_", " ")}
                      </span>
                    </td>

                    <td>
                      {a.assignedTo || "Unassigned"}
                    </td>

                    <td>
                      {a.department || "-"}
                    </td>

                    <td>
                      <div className="action-buttons">
                       <button
                         className="edit-btn"
                         onClick={() => setEditingAsset({ ...a })}
                       >
                         Edit
                       </button>

                       <button
                         className="delete-btn"
                         onClick={() => deleteAsset(a.id)}
                       >
                         Delete
                       </button>
                      </div>
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </section>

            {/* EDIT ASSET */}

      {editingAsset && (
        <section className="panel">

          <div className="panel-header">
            <div>
              <h2>Edit Asset</h2>
              <p>Update the selected IT asset</p>
            </div>
          </div>

          <form
            className="form-grid"
            onSubmit={async (e) => {
              e.preventDefault();

              try {
                await axios.put(
                  `${API}/assets/${editingAsset.id}`,
                  editingAsset
                );

                alert("Asset updated successfully!");

                setEditingAsset(null);
                loadData();

              } catch (error) {
                console.error(error);
                alert(
                  error.response?.data?.error ||
                  "Failed to update asset."
                );
              }
            }}
          >

            <div className="form-group">
              <label>Asset Tag *</label>
              <input
                value={editingAsset.assetTag || ""}
                onChange={(e) =>
                  setEditingAsset({
                    ...editingAsset,
                    assetTag: e.target.value
                  })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Asset Name *</label>
              <input
                value={editingAsset.assetName || ""}
                onChange={(e) =>
                  setEditingAsset({
                    ...editingAsset,
                    assetName: e.target.value
                  })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                value={editingAsset.category || ""}
                onChange={(e) =>
                  setEditingAsset({
                    ...editingAsset,
                    category: e.target.value
                  })
                }
              >
                <option>Laptop</option>
                <option>Desktop</option>
                <option>Monitor</option>
                <option>Printer</option>
                <option>Mobile</option>
                <option>Network Equipment</option>
              </select>
            </div>

            <div className="form-group">
              <label>Brand *</label>
              <input
                value={editingAsset.brand || ""}
                onChange={(e) =>
                  setEditingAsset({
                    ...editingAsset,
                    brand: e.target.value
                  })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Model *</label>
              <input
                value={editingAsset.model || ""}
                onChange={(e) =>
                  setEditingAsset({
                    ...editingAsset,
                    model: e.target.value
                  })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Serial Number *</label>
              <input
                value={editingAsset.serialNumber || ""}
                onChange={(e) =>
                  setEditingAsset({
                    ...editingAsset,
                    serialNumber: e.target.value
                  })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Status *</label>
              <select
                value={editingAsset.status || "AVAILABLE"}
                onChange={(e) =>
                  setEditingAsset({
                    ...editingAsset,
                    status: e.target.value
                  })
                }
              >
                <option value="AVAILABLE">Available</option>
                <option value="ASSIGNED">Assigned</option>
                <option value="UNDER_MAINTENANCE">
                  Under Maintenance
                </option>
                <option value="RETIRED">Retired</option>
              </select>
            </div>

            <div className="form-group">
              <label>Purchase Date *</label>
              <input
                type="date"
                value={editingAsset.purchaseDate || ""}
                onChange={(e) =>
                  setEditingAsset({
                    ...editingAsset,
                    purchaseDate: e.target.value
                  })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Assigned To</label>
              <input
                value={editingAsset.assignedTo || ""}
                onChange={(e) =>
                 setEditingAsset({
                  ...editingAsset,
                  assignedTo: e.target.value
                 })
                }
                placeholder="Employee name"
                disabled={editingAsset.status !== "ASSIGNED"}
              />
            </div>

            <div className="form-group">
              <label>Department</label>
              <input
                value={editingAsset.department || ""}
                onChange={(e) =>
                  setEditingAsset({
                  ...editingAsset,
                  department: e.target.value
                 })
                }
                placeholder="IT"
                disabled={editingAsset.status !== "ASSIGNED"}
              />
           </div>

            <div className="form-action">
              <button type="submit">
                Save Changes
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() => setEditingAsset(null)}
              >
                Cancel
              </button>
            </div>

          </form>

        </section>
      )}

      {/* SERVICE REQUEST FORM */}

      <section className="panel">

        <div className="panel-header">
          <div>
            <h2>Create Service Request</h2>
            <p>Report IT issues and service requirements</p>
          </div>
        </div>

        <form className="form-grid" onSubmit={addRequest}>

          <div className="form-group">
            <label>Request Title *</label>

            <input
              value={request.title}
              onChange={(e) =>
                setRequest({
                  ...request,
                  title: e.target.value
                })
              }
              placeholder="Laptop not starting"
              required
            />
          </div>

          <div className="form-group">
            <label>Priority</label>

            <select
              value={request.priority}
              onChange={(e) =>
                setRequest({
                  ...request,
                  priority: e.target.value
                })
              }
            >
              <option>LOW</option>
              <option>MEDIUM</option>
              <option>HIGH</option>
            </select>
          </div>

          <div className="form-group">
            <label>Requested By</label>

            <input
              value={request.requestedBy}
              onChange={(e) =>
                setRequest({
                  ...request,
                  requestedBy: e.target.value
                })
              }
              placeholder="Employee name"
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <input
              value={request.description}
              onChange={(e) =>
                setRequest({
                  ...request,
                  description: e.target.value
                })
              }
              placeholder="Describe the issue"
            />
          </div>

          <div className="form-action">
            <button type="submit">
              Create Request
            </button>
          </div>

        </form>

      </section>

      {/* SERVICE REQUESTS */}

      <section className="panel">

        <div className="panel-header">
          <div>
            <h2>Service Requests</h2>
            <p>Track employee IT support requests</p>
          </div>
        </div>

        <div className="controls">
  <input
    type="text"
    placeholder="Search requests..."
    value={requestSearch}
    onChange={(e) => setRequestSearch(e.target.value)}
  />

  <select
    value={requestPriorityFilter}
    onChange={(e) =>
      setRequestPriorityFilter(e.target.value)
    }
  >
    <option value="ALL">All Priorities</option>
    <option value="LOW">Low</option>
    <option value="MEDIUM">Medium</option>
    <option value="HIGH">High</option>
  </select>
</div>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Requested By</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredRequests.length === 0 ? (

                <tr>
                  <td colSpan="5" className="empty">
                    No service requests found
                  </td>
                </tr>

              ) : (

                filteredRequests.map((r) => (

                  <tr key={r.id}>
                    <td>#{r.id}</td>
                    <td>{r.title}</td>

                    <td>
                      <span className={`badge ${r.priority}`}>
                        {r.priority}
                      </span>
                    </td>

                    <td>
  <span className={`badge ${r.status}`}>
    {r.status.replace("_", " ")}
  </span>
</td>
<td>
  {r.requestedBy || "-"}
</td>

                    <td>
  <select
    value={r.status}
    onChange={async (e) => {
      try {
        const response = await axios.put(
          `${API}/service-requests/${r.id}/status?status=${e.target.value}`
        );

        setRequests((currentRequests) =>
          currentRequests.map((request) =>
            request.id === r.id ? response.data : request
          )
        );
      } catch (error) {
        console.error("Failed to update request status:", error);
        alert("Failed to update request status.");
      }
    }}
  >
    <option value="OPEN">OPEN</option>
    <option value="IN_PROGRESS">IN PROGRESS</option>
    <option value="RESOLVED">RESOLVED</option>
  </select>
</td>
                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </section>

      <footer>
        IT Asset & Service Management System • Full Stack Application
      </footer>

    </div>
  );
}

export default App;