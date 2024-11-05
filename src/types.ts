export interface CalculationResult {
  role: string;
  cost: number;
  expectedTasks: number;
  tasksPerDay: number;
  maxClicksPerDay: number;
  productivity: number;
  valueProduced: number;
  expectedValue: number;
  trueCost: number;
  totalRoleValue: number;
  employees: number;
  experience: 'Beginner' | 'Seasoned' | 'Expert';
}