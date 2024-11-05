import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { CalculationResult } from '../types';
import { Tooltip } from './Tooltip';

interface ResultsDisplayProps {
  result: CalculationResult;
  showChart?: boolean;
}

export function ResultsDisplay({ result, showChart = true }: ResultsDisplayProps) {
  const chartData = [
    {
      name: 'Average\nWage',
      value: result.cost,
      color: '#3B82F6'
    },
    {
      name: 'Value\nProduced',
      value: result.valueProduced,
      color: result.valueProduced >= result.expectedValue ? '#10B981' : '#8B5CF6'
    },
    {
      name: 'Cost/\nBenefit',
      value: result.trueCost,
      color: result.trueCost >= 0 ? '#10B981' : '#EF4444'
    }
  ];

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div>
            <Tooltip content="The percentage of role-based quota/day, as required by the employer, possible to complete at the given load times (EPT)">
              <h3 className="text-lg font-medium text-gray-900">Productivity Analysis</h3>
            </Tooltip>
            <p className="text-3xl font-bold text-blue-600">{result.productivity.toFixed(1)}%</p>
            <p className="text-sm text-gray-500">of expected productivity</p>
            <p className="text-sm text-gray-500">Experience Level: {result.experience}</p>
          </div>

          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium text-gray-500">Tasks Per Day</p>
              <p className="text-lg font-semibold">{result.tasksPerDay} / {result.expectedTasks}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Max Clicks/Day</p>
              <p className="text-lg font-semibold">{result.maxClicksPerDay.toFixed(0)}</p>
            </div>
            <div>
              <Tooltip content="At the EPT submitted, this number represents the estimated dollar value of the net cost (or benefit) of an employee given their productivity as a percentage of the employer's total amount paid. Employer's cost is adjusted for 50% additional cost of employment beyond wages/annum., per employee, and on average.">
                <p className="text-sm font-medium text-gray-500">True Labor Cost</p>
              </Tooltip>
              <p className={`text-lg font-semibold ${result.trueCost >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(result.trueCost)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Net Combined Role Value</p>
              <p className={`text-lg font-semibold ${result.totalRoleValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(result.totalRoleValue)}
              </p>
            </div>
          </div>
        </div>

        <div className="md:w-3/5 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 80, right: 20, top: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(value) => formatCurrency(value)} />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={80}
                tick={{ 
                  fontSize: 12,
                  fontWeight: 600,
                  fill: '#374151',
                  dy: 0
                }}
              />
              <RechartsTooltip 
                formatter={(value: number) => [formatCurrency(value), '']}
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }}
              />
              <Bar 
                dataKey="value" 
                fill="#3B82F6"
                radius={[0, 4, 4, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}