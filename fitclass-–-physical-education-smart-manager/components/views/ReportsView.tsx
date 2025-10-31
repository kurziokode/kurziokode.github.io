import React, { useState, useCallback } from 'react';
import { Student, Class, PerformanceRecord, BehaviorLog } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Spinner } from '../ui/Spinner';
import { generateInDepthReport } from '../../services/geminiService';
import { marked } from 'marked';
import { exportToCsv } from '../../utils/helpers';

interface ReportsViewProps {
  students: Student[];
  classes: Class[];
  performance: PerformanceRecord[];
  behavior: BehaviorLog[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ students, classes, performance, behavior }) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [report, setReport] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReport = useCallback(async () => {
    if (!selectedStudentId) return;

    setIsLoading(true);
    setError(null);
    setReport('');
    
    try {
      const student = students.find(s => s.id === selectedStudentId);
      if (!student) throw new Error("Student not found");

      const studentData = {
        profile: student,
        performance: performance.filter(p => p.studentId === selectedStudentId),
        behavior: behavior.filter(b => b.studentId === selectedStudentId),
      };

      const generatedReport = await generateInDepthReport(studentData);
      setReport(generatedReport);
    } catch (err: any) {
      setError(err.message || 'Failed to generate report.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedStudentId, students, performance, behavior]);

  const handleExportPerformanceCsv = () => {
    if (!selectedStudentId) return;
    const student = students.find(s => s.id === selectedStudentId);
    if (!student) return;

    const performanceData = performance.filter(p => p.studentId === selectedStudentId);
    if (performanceData.length > 0) {
        exportToCsv(`performance_${student.name.replace(' ', '_')}.csv`, performanceData);
    } else {
        alert('No performance data to export for this student.');
    }
  };

  const handleExportBehaviorCsv = () => {
      if (!selectedStudentId) return;
      const student = students.find(s => s.id === selectedStudentId);
      if (!student) return;
      
      const behaviorData = behavior.filter(b => b.studentId === selectedStudentId);
      if (behaviorData.length > 0) {
          exportToCsv(`behavior_${student.name.replace(' ', '_')}.csv`, behaviorData);
      } else {
          alert('No behavior data to export for this student.');
      }
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Generate Student Report</h2>
        <div className="flex items-end space-x-4">
          <div className="flex-grow">
            <label htmlFor="student-select" className="block text-sm font-medium text-gray-700">Select a Student</label>
            <select
              id="student-select"
              value={selectedStudentId}
              onChange={e => setSelectedStudentId(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">-- Select a student --</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>{s.name} - {classes.find(c => c.id === s.classId)?.name}</option>
              ))}
            </select>
          </div>
          <Button onClick={handleGenerateReport} disabled={!selectedStudentId || isLoading}>
            {isLoading ? <Spinner /> : '🧠 Generate In-Depth Report'}
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">This uses Thinking Mode for a comprehensive analysis.</p>

        {selectedStudentId && (
            <div className="mt-4 pt-4 border-t">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Export Data</h3>
                <div className="flex flex-wrap gap-2">
                    <Button onClick={handleExportPerformanceCsv} variant="secondary" size="sm">Export Performance (CSV)</Button>
                    <Button onClick={handleExportBehaviorCsv} variant="secondary" size="sm">Export Behavior (CSV)</Button>
                    <Button variant="secondary" size="sm" disabled title="Coming soon!">Export Performance (PDF)</Button>
                    <Button variant="secondary" size="sm" disabled title="Coming soon!">Export Behavior (PDF)</Button>
                </div>
            </div>
        )}
      </Card>

      {error && <Card className="bg-red-100 text-red-700">{error}</Card>}

      {report && (
        <Card>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Generated Report</h3>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: marked(report) }}
          />
        </Card>
      )}
    </div>
  );
};
