import React, { useState, useEffect } from 'react';
import { Student, Class } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Icon } from '../ui/Icon';
import { Modal } from '../ui/Modal';
import { generateId } from '../../utils/helpers';

interface ClassesViewProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  classes: Class[];
  setClasses: React.Dispatch<React.SetStateAction<Class[]>>;
}

const StudentCard: React.FC<{ 
  student: Student; 
  onEdit: (student: Student) => void; 
  onDelete: (studentId: string) => void;
  isSelected: boolean;
  onToggleSelection: (studentId: string) => void;
}> = ({ student, onEdit, onDelete, isSelected, onToggleSelection }) => {
  return (
    <Card className={`relative flex flex-col items-center text-center transition-all ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggleSelection(student.id)}
        className="absolute top-3 left-3 h-5 w-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        aria-label={`Select ${student.name}`}
      />
      <img src={student.photoUrl} alt={student.name} className="w-24 h-24 rounded-full mb-4 object-cover" />
      <h4 className="font-bold text-lg">{student.name}</h4>
      <p className="text-sm text-gray-500">Age: {student.age}</p>
      <p className="text-xs text-gray-600 mt-2 flex-grow">{student.notes}</p>
      <div className="flex mt-4 space-x-2">
        <Button size="sm" variant="secondary" onClick={() => onEdit(student)}><Icon name="edit" className="w-4 h-4" /></Button>
        <Button size="sm" variant="danger" onClick={() => onDelete(student.id)}><Icon name="delete" className="w-4 h-4" /></Button>
      </div>
    </Card>
  );
};


const StudentForm: React.FC<{
    student: Partial<Student> | null;
    classes: Class[];
    onSave: (student: Student) => void;
    onClose: () => void;
}> = ({ student, classes, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        id: student?.id || generateId(),
        name: student?.name || '',
        age: student?.age || 6,
        classId: student?.classId || classes[0]?.id || '',
        notes: student?.notes || '',
        photoUrl: student?.photoUrl || `https://picsum.photos/seed/${generateId()}/100`
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'age' ? parseInt(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name && formData.classId) {
            onSave(formData as Student);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Class</label>
                <select name="classId" value={formData.classId} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div className="flex justify-end space-x-2">
                <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                <Button type="submit">Save Student</Button>
            </div>
        </form>
    )
}

export const ClassesView: React.FC<ClassesViewProps> = ({ students, setStudents, classes, setClasses }) => {
  const [selectedClassId, setSelectedClassId] = useState<string | null>(classes[0]?.id || null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Partial<Student> | null>(null);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

  useEffect(() => {
    setSelectedStudentIds([]);
  }, [selectedClassId]);

  const handleAddStudent = () => {
    setEditingStudent({});
    setIsModalOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };
  
  const handleDeleteStudent = (studentId: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
        setStudents(prev => prev.filter(s => s.id !== studentId));
    }
  }

  const handleSaveStudent = (student: Student) => {
    if (editingStudent && 'id' in editingStudent && editingStudent.id) {
        setStudents(prev => prev.map(s => s.id === student.id ? student : s));
    } else {
        setStudents(prev => [...prev, student]);
    }
    setIsModalOpen(false);
    setEditingStudent(null);
  }

  const handleToggleSelection = (studentId: string) => {
    setSelectedStudentIds(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId) 
        : [...prev, studentId]
    );
  };

  const handleBulkDelete = () => {
    if (selectedStudentIds.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedStudentIds.length} selected students?`)) {
      setStudents(prev => prev.filter(s => !selectedStudentIds.includes(s.id)));
      setSelectedStudentIds([]);
    }
  };

  const studentsInClass = students.filter(s => s.classId === selectedClassId);

  return (
    <div className="p-6">
        <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2 bg-gray-200 p-1 rounded-lg">
                {classes.map(c => (
                    <button key={c.id} onClick={() => setSelectedClassId(c.id)}
                        className={`px-4 py-2 rounded-md font-semibold transition ${selectedClassId === c.id ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:bg-gray-300'}`}>
                        {c.name}
                    </button>
                ))}
            </div>
            <div className="flex items-center space-x-2">
              {selectedStudentIds.length > 0 && (
                <Button onClick={handleBulkDelete} variant="danger">
                  <Icon name="delete" className="w-5 h-5 mr-2" />
                  Delete ({selectedStudentIds.length})
                </Button>
              )}
              <Button onClick={handleAddStudent}>
                  <Icon name="add" className="w-5 h-5 mr-2" /> Add Student
              </Button>
            </div>
        </div>

        {studentsInClass.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {studentsInClass.map(student => (
                    <StudentCard 
                      key={student.id} 
                      student={student} 
                      onEdit={handleEditStudent} 
                      onDelete={handleDeleteStudent}
                      isSelected={selectedStudentIds.includes(student.id)}
                      onToggleSelection={handleToggleSelection} 
                    />
                ))}
            </div>
        ) : (
            <Card className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-700">No students in this class yet.</h3>
                <p className="text-gray-500 mt-2">Click "Add Student" to get started.</p>
            </Card>
        )}
        
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingStudent?.id ? 'Edit Student' : 'Add New Student'}>
            <StudentForm student={editingStudent} classes={classes} onSave={handleSaveStudent} onClose={() => setIsModalOpen(false)} />
        </Modal>
    </div>
  );
};