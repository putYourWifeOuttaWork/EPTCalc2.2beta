import React, { useState, useEffect, useRef } from 'react';
import { Tooltip } from './Tooltip';
import { Trash2 } from 'lucide-react';
import { CalculationResult } from '../types';

interface CalculatorFormProps {
  onCalculate: (result: CalculationResult) => void;
  onDelete?: () => void;
  formIndex: number;
  autoScroll?: boolean;
}

const EXPERTISE_MULTIPLIERS = {
  'Beginner': 0.15,
  'Seasoned': 0.20,
  'Expert': 0.25
};

const MINUTES_PER_DAY = 360; // 6 working hours

function calculateClicksPerMinute(ept: number, experience: 'Beginner' | 'Seasoned' | 'Expert'): number {
  const theoreticalMax = 60 / ept; // Maximum possible clicks per minute
  const expertiseMultiplier = EXPERTISE_MULTIPLIERS[experience];
  const x = theoreticalMax * expertiseMultiplier;
  const y = (Math.log(1 / ept)) + x;
  return y;
}

export function CalculatorForm({ onCalculate, onDelete, formIndex, autoScroll }: CalculatorFormProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const [role, setRole] = useState('Service Agent');
  const [cost, setCost] = useState('45000');
  const [employees, setEmployees] = useState('1000');
  const [ept, setEpt] = useState(2.4);
  const [tasksPerDay, setTasksPerDay] = useState('80');
  const [clicksPerTask, setClicksPerTask] = useState('30');
  const [experience, setExperience] = useState<'Beginner' | 'Seasoned' | 'Expert'>('Seasoned');

  // Generate EPT values from 4.0 down to 0.3 with 0.1 intervals
  const eptValues = Array.from({ length: 38 }, (_, i) => (4.0 - i * 0.1).toFixed(1))
    .map(Number)
    .filter(val => val >= 0.3);

  const roleDefaults = {
    'Service Agent': { tasks: '90', clicks: '23' },
    'Sales Development Rep': { tasks: '120', clicks: '22' },
    'Account Executive': { tasks: '22', clicks: '200' }
  };

  useEffect(() => {
    if (autoScroll && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [autoScroll]);

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
    const defaults = roleDefaults[newRole as keyof typeof roleDefaults];
    setTasksPerDay(defaults.tasks);
    setClicksPerTask(defaults.clicks);
  };

  const handleNumberInput = (value: string, setter: (value: string) => void) => {
    if (value === '' || /^\d+$/.test(value)) {
      setter(value);
    }
  };

  const handleCalculate = () => {
    const clicksPerMinute = calculateClicksPerMinute(ept, experience);
    const maxClicksPerDay = Math.floor(clicksPerMinute * MINUTES_PER_DAY);
    const actualTasksPerDay = Math.floor(maxClicksPerDay / Number(clicksPerTask || 0));
    const productivity = (actualTasksPerDay / Number(tasksPerDay || 0)) * 100;
    const costNum = Number(cost || 0);
    const expectedValue = costNum * 1.5;
    const valueProduced = (productivity / 100) * expectedValue;
    const trueCost = valueProduced - expectedValue;
    const totalRoleValue = trueCost * Number(employees || 0);

    onCalculate({
      role,
      cost: costNum,
      expectedTasks: Number(tasksPerDay || 0),
      tasksPerDay: actualTasksPerDay,
      maxClicksPerDay,
      productivity,
      valueProduced,
      expectedValue,
      trueCost,
      totalRoleValue,
      employees: Number(employees || 0),
      experience
    });
  };

  return (
    <div ref={formRef} className="bg-white rounded-lg shadow p-6 relative">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">Productivity Calculation {formIndex + 1}</h2>
        {onDelete && (
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100"
            title="Delete calculator"
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="block text-sm font-medium text-gray-700">Employee Role</div>
          <select
            value={role}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option>Service Agent</option>
            <option>Sales Development Rep</option>
            <option>Account Executive</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <Tooltip content="The experience level of a group of employees in this role, broken down into 3 possible levels. If breaking down roles into expertise level cohorts, only count total Employees who fit into this Expertise level for this calculator.">
          Cohort Expertise
          </Tooltip>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value as 'Beginner' | 'Seasoned' | 'Expert')}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Beginner">Beginner</option>
            <option value="Seasoned">Seasoned</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <Tooltip content="The estimated wage/year for employees in this role">
            Avg. Wage/Yr per Employee of This Experience Level ($)
          </Tooltip>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={cost}
            onChange={(e) => handleNumberInput(e.target.value, setCost)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Tooltip content="How many full-time equivalent employees work in this role at the company">
            Number of Employees at this Expertise Level
          </Tooltip>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={employees}
            onChange={(e) => handleNumberInput(e.target.value, setEmployees)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Tooltip content="The quota of macro-tasks to be completed/day for minimum breakeven performance. For Example: An SDR quota is usually 100 leads managed each day.">
            Expected Tasks/Day For This Role
          </Tooltip>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={tasksPerDay}
            onChange={(e) => handleNumberInput(e.target.value, setTasksPerDay)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Tooltip content="How many clicks does it take on average, to complete a single quota task, given the user-journeys possible for different types of tasks worked.">
            Average Clicks/Task
          </Tooltip>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={clicksPerTask}
            onChange={(e) => handleNumberInput(e.target.value, setClicksPerTask)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Tooltip content="The rounded Average Experienced Page Time (EPT) for the org, or specifically, for the average EPT of the combined records, lists, related lists, automation logic, call-outs, triggered actions, and other system load times in the user-journey for this role's task-set. Recommnded Tools: SPLUNK CATT DASHBOARD & SPLUNK LIGHTNING DASHBOARD">
            EPT (seconds)
          </Tooltip>
          <select
            value={ept}
            onChange={(e) => setEpt(Number(e.target.value))}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {eptValues.map((eptValue) => (
              <option key={eptValue} value={eptValue}>{eptValue.toFixed(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Calculate
      </button>
    </div>
  );
}