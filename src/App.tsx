import React, { useState, useRef } from 'react';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductivityChart } from './components/ProductivityChart';
import { CalculationResult } from './types';
import { FileText, Download, FileDown } from 'lucide-react';

export default function App() {
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [formCount, setFormCount] = useState(1);
  const [lastAddedForm, setLastAddedForm] = useState<number | null>(null);
  const citationsRef = useRef<HTMLDetailsElement>(null);

  const handleCalculate = (result: CalculationResult, index: number) => {
    const newResults = [...results];
    newResults[index] = result;
    setResults(newResults);
  };

  const handleAddForm = () => {
    setFormCount(prev => prev + 1);
    setLastAddedForm(formCount);
  };

  const handleDeleteForm = (index: number) => {
    const newResults = [...results];
    newResults.splice(index, 1);
    setResults(newResults);
    setFormCount(prev => prev - 1);
  };

  const handleExportCSV = () => {
    if (results.length === 0) return;

    if (citationsRef.current) {
      citationsRef.current.open = true;
    }

    const headers = [
      'Role', 'Cost/Employee', 'Employees', 'Expected Tasks/Day',
      'Actual Tasks/Day', 'Productivity %', 'Value Produced',
      'Expected Value', 'True Cost', 'Total Role Value', 'Experience Level'
    ];

    const csvContent = [
      headers.join(','),
      ...results.map(r => [
        r.role,
        r.cost,
        r.employees,
        r.expectedTasks,
        r.tasksPerDay,
        r.productivity.toFixed(2),
        r.valueProduced.toFixed(2),
        r.expectedValue.toFixed(2),
        r.trueCost.toFixed(2),
        r.totalRoleValue.toFixed(2),
        r.experience
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'productivity_analysis.csv';
    link.click();
  };

  const handleExportPDF = () => {
    if (citationsRef.current) {
      citationsRef.current.open = true;
    }
    window.print();
  };

  const showBottomAddButton = results.length >= 2;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 print:bg-white">
      <Header />

      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex gap-4 flex-wrap print:hidden">
            <button
              onClick={handleAddForm}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <FileText size={20} />
              Add Role Calculation
            </button>
            
            {results.length > 0 && (
              <>
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <Download size={20} />
                  Export to CSV
                </button>
                <button
                  onClick={handleExportPDF}
                  className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors flex items-center gap-2"
                >
                  <FileDown size={20} />
                  Export to PDF
                </button>
              </>
            )}
          </div>

          {Array.from({ length: formCount }).map((_, index) => (
            <div key={index} className="space-y-4">
              <CalculatorForm 
                onCalculate={(result) => handleCalculate(result, index)}
                onDelete={index > 0 ? () => handleDeleteForm(index) : undefined}
                formIndex={index}
                autoScroll={index === lastAddedForm}
              />
              {results[index] && <ResultsDisplay result={results[index]} showChart={false} />}
            </div>
          ))}

          {showBottomAddButton && (
            <div className="flex justify-center print:hidden">
              <button
                onClick={handleAddForm}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <FileText size={20} />
                Add Role Calculation
              </button>
            </div>
          )}

          {results.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-6">Productivity Analysis Chart</h3>
              <div className="h-[600px]">
                <ProductivityChart results={results} />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer citationsRef={citationsRef} />
    </div>
  );
}