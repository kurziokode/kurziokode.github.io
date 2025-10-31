
import React from 'react';
import { Card } from '../ui/Card';
import { Icon } from '../ui/Icon';
import { Student, Class } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardViewProps {
  students: Student[];
  classes: Class[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({ students, classes }) => {
    const totalStudents = students.length;
    const totalClasses = classes.length;

    const classData = classes.map(c => ({
        name: c.name,
        students: students.filter(s => s.classId === c.id).length,
    }));

    return (
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-blue-400 to-blue-500 text-white">
                    <div className="flex items-center">
                        <Icon name="classes" className="w-8 h-8 mr-4" />
                        <div>
                            <p className="text-lg font-semibold">Total Classes</p>
                            <p className="text-3xl font-bold">{totalClasses}</p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-gradient-to-br from-green-400 to-green-500 text-white">
                    <div className="flex items-center">
                        <Icon name="dashboard" className="w-8 h-8 mr-4" />
                        <div>
                            <p className="text-lg font-semibold">Total Students</p>
                            <p className="text-3xl font-bold">{totalStudents}</p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white">
                    <div className="flex items-center">
                        <Icon name="activities" className="w-8 h-8 mr-4" />
                        <div>
                            <p className="text-lg font-semibold">Engagement</p>
                            <p className="text-3xl font-bold">High</p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-gradient-to-br from-purple-400 to-purple-500 text-white">
                    <div className="flex items-center">
                        <Icon name="reports" className="w-8 h-8 mr-4" />
                        <div>
                            <p className="text-lg font-semibold">Avg. Performance</p>
                            <p className="text-3xl font-bold">4.2/5</p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <h3 className="text-xl font-bold mb-4 text-gray-700">Students per Class</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={classData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="students" fill="#3B82F6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                <Card>
                    <h3 className="text-xl font-bold mb-4 text-gray-700">Quick Actions</h3>
                    <div className="space-y-3">
                        <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition">Plan a New Lesson</button>
                        <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition">Generate an Activity</button>
                        <button className="w-full text-left p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition">Log Behavior</button>
                        <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition">View Reports</button>
                    </div>
                </Card>
            </div>
        </div>
    );
};
