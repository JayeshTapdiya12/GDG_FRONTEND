import React, { useState, useEffect } from 'react'

import axios from "axios";
import Footer from '../copoments/Footer';
import Nacbar from '../copoments/Nacbar';
import {
    submitStatus,
    getStatusList,
    updateStatus,
    deleteStatus
} from '../service/status.serivce';

const ScholarshipStatusChecker = () => {
    const [scholarship, setScholarship] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('in_progress');

    const [allStatuses, setAllStatuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchStatuses = async () => {
        try {
            setLoading(true);
            const response = await getStatusList();
            setAllStatuses(response.data.data);
        } catch (err) {
            setError('Failed to fetch status list');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatuses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await submitStatus({ Scholarship: scholarship, name, status });
            setScholarship('');
            setName('');
            setStatus('in_progress');
            fetchStatuses();
        } catch (err) {
            setError('Failed to submit');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteStatus(id);
            fetchStatuses();
        } catch (err) {
            setError('Delete failed');
        }
    };

    return (
        <>
            <Nacbar />
            <div className="p-6 max-w-4xl mx-auto mt-10 bg-white shadow rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">🎓 Scholarship Status Checker</h2>

                <form onSubmit={handleSubmit} className="grid gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Scholarship Name"
                        value={scholarship}
                        onChange={(e) => setScholarship(e.target.value)}
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded p-2"
                        required
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border rounded p-2"
                    >
                        <option value="in_progress">In Progress</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Add Scholarship Status
                    </button>
                </form>

                {loading && <p className="text-center text-gray-600">Loading statuses...</p>}
                {error && <p className="text-red-600 text-center">{error}</p>}

                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Your Applications:</h3>
                    {allStatuses.length === 0 ? (
                        <p className="text-gray-500">No status entries yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {allStatuses.map((item) => (
                                <div key={item._id} className="border p-4 rounded-md bg-gray-50 shadow-sm">
                                    <p><strong>Scholarship:</strong> {item.Scholarship}</p>
                                    <p><strong>Name:</strong> {item.name}</p>
                                    <p>
                                        <strong>Status:</strong>{' '}
                                        <span className={`font-bold ${item.status === 'accepted' ? 'text-green-600' : item.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                                            {item.status}
                                        </span>
                                    </p>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ScholarshipStatusChecker
