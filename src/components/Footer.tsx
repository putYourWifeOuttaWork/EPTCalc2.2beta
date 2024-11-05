import React, { useState, useRef } from 'react';
import { Calculator } from 'lucide-react';

interface FooterProps {
  citationsRef?: React.RefObject<HTMLDetailsElement>;
}

export function Footer({ citationsRef }: FooterProps) {
  return (
    <footer className="bg-gray-50 print:bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          <Calculator className="h-6 w-6 text-gray-400" />
          <p className="text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} EPT Productivity Calculator. All rights reserved.
          </p>
          
          <details ref={citationsRef} className="text-sm text-gray-600 print:open w-full">
            <summary className="cursor-pointer font-medium print:hidden">Citations and Disclaimer</summary>
            <div className="mt-2 p-4 bg-white rounded-lg shadow text-xs">
              <p className="mb-4">
                The outputs calculated herein are not claims or guarantees, forecasts, or results. 
                This study is a derivative of hundreds of studies which contribute to the canon "Law of UIUX" - Doherty's Threshold.
              </p>
              <div className="space-y-2">
                <p><a href="https://www.researchgate.net/publication/202165676_The_Economic_Value_of_Rapid_Response_Time" className="text-blue-500 hover:underline">IBM 1982, The Economic Value of Rapid Response Time</a></p>
                <p>Myers, Brad. (1985). The importance of percent-done progress indicators for computer-human interfaces. ACM SIGCHI Bulletin. 16. 11-17.</p>
                <p>Miller, Lawrence. (1977). A Study in Man-Machine Interaction. AFIPS Natl Comput Conf Expo Conf Proc. 46. 409-421.</p>
                <p>Weisberg, David. (1984). The Impact of Network System Architecture on CAD/CAM Productivity. Computer Graphics and Applications, IEEE. 4. 36-40.</p>
                <p>Spence, Robert. (1993). Human factors in interactive graphics. Computer-Aided Design. 25. 671-676.</p>
                <p>Rashid, Richard & Robertson, George. (1981). Accent: A Communication Oriented Network Operating System Kernel. Proc. Eighth ACM Symp. Operating Systems Principles. 64-75.</p>
                <p><a href="https://yusufarslan.net/sites/yusufarslan.net/files/upload/content/Miller1968.pdf" className="text-blue-500 hover:underline">Miller, Robert. (1968). Response time in man-computer conversational transactions.</a></p>
              </div>
            </div>
          </details>

          <details className="text-sm text-gray-600 print:open w-full">
            <summary className="cursor-pointer font-medium print:hidden">Estimations and Equations Used</summary>
            <div className="mt-2 p-4 bg-white rounded-lg shadow text-xs space-y-4">
              <h3 className="text-lg font-semibold">The Critical Impact of User Interface Design on Business System Productivity</h3>
              
              <div>
                <h4 className="text-base font-medium">Introduction</h4>
                <p>In the modern business landscape, the efficiency of human-to-business-system interfaces plays a crucial role in overall productivity. While consumer-facing applications have long prioritized user experience, many business systems lag behind, focusing primarily on functionality at the expense of usability. This paper examines the current challenges in business system interfaces and explores the significant impact of system response times on user productivity.</p>
              </div>

              <ol className="list-decimal pl-5 space-y-2">
                <li>Macro-Processing Focus: Business systems are often designed for macro-level processes, such as project completion or opportunity progression, rather than optimizing for the numerous micro-tasks that make up an employee's daily workflow.</li>
                <li>Complexity Over Usability: Front-office employees frequently work with interfaces containing excessive form fields, lack of descriptive tooltips, and non-intuitive design elements. This complexity leads to increased error rates and reduced efficiency.</li>
                <li>Function Over Form: The emphasis on functionality often overshadows the importance of form in business system design, resulting in interfaces that are difficult to navigate and use effectively.</li>
                <li>Data Silos and Processing Overhead: Despite advancements in data management and processing capabilities, many business systems suffer from data silos and inefficient data traversal, leading to slower response times and reduced user productivity.</li>
              </ol>

              <div>
                <h5 className="text-sm font-medium">The Psychological Impact of System Response Times</h5>
                <p>The Doherty Effect posits that productivity soars when a computer and its users interact at a pace (less than 400ms) that ensures neither has to wait on the other. The potential benefits for an organization in providing improved and ultimately sub-second response time for online computing include:</p>
              </div>

              <div>
                <h5 className="text-sm font-medium">Benefits Shown By Studies</h5>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Substantial cost savings</li>
                  <li>Improved individual productivity</li>
                  <li>Shortened project schedules</li>
                  <li>Better quality of work</li>
                </ol>
                <p className="mt-2">These benefits are inherent in the computing situation and do not depend on the type of work being done, as demonstrated by the diversity of environments in which they have been observed.</p>
              </div>

              <div>
                <h5 className="text-sm font-medium">Quantifying the Productivity Impact</h5>
                <p className="font-bold">Using the Equation: Y = LN(1/b)+a</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Y is the output variable representing Productivity (tasks per minute possible at a given EPT measurement)</li>
                  <li>a is the variable representing the specific theoretical maximum interactions/min at a specific EPT for a user at a given expertise level, given a limitation of 1 click/second maximum for business usage, with a thought and familiarity basic reduction to go from absolute maximum to theoretical maximum. For example, the maximum Transactions/min then would be 60 divided by EPT. So, at 3.0 EPT, Actual max = 20. To account for human response and system familiarity and movement, for a beginner user: 25% of this true maximum, 30% for Average users, 32.5% for Experts (create the theoretical max of 5 actions/min at 3.0 EPT giving us a roundabout estimate, that will be used to calculate the logarithmic adjusted max with the EPT equation).</li>
                  <li>b is the variable representing EPT in seconds (Required Entry as key variable and X-Intercept)</li>
                  <li>Y is then the natural logarithm when EPT is known. When charted, this creates a Logarithmic decay curve as EPT increases, similar to a radio-active half-life.</li>
                </ol>
              </div>

              <div>
                <h5 className="text-sm font-medium">The Impact of Data Silos, UX Design Strategy, Conditional Lazy Loading, and Data Architecture on System Performance</h5>
                <p>Data silos significantly impact system response times and user productivity in several ways:</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Increased Query Complexity: When important contextual data is scattered across hard-to-find notes or associated records within the same system, it necessitates more complex query logic, leading to higher EPT.</li>
                  <li>Unstructured Data Challenges: Notes and other unstructured string data types are often lost for all intents and purposes unless explicitly developed for. More advanced systems, such as vectorDB utilization with retrieval-enabled generative AI, can bring this data into context but at the cost of increased load time.</li>
                  <li>Off-System Data Access: Data residing in external systems requires API calls, introducing additional call times and third-party EPT, further slowing down the overall system response. While data silos are often inevitable, organizations should focus heavily on data integrity and architecture to ensure fast loads.</li>
                  <li>UI Design UX Strategy: implementing simplified and dynamically changing user interfaces can help avoid the need for erroneous loads.</li>
                  <li>Conditional Lazy Loading: utilizing the details of user journeys for a role and with record stage focused milestones, LEX can enable simpler, easier to use, and much faster loading interfaces with clear high-impact next click.</li>
                  <li>Data Architecture Best Practices: utilizing Data architecture best practices for lists, reports, queries, and architectural design, orgs can avoid concurrencies, timeouts, api call time, page and component load times, and eliminate row lock errors.</li>
                </ol>
              </div>

              <div>
                <h5 className="text-sm font-medium">Conclusion and Recommendations:</h5>
                <p className="mb-2">The design of human-to-business-system interfaces has a profound impact on employee productivity and overall business efficiency. By prioritizing human-centric design principles and optimizing system response times, orgs can capitalize on positive reinforcement models which help reward their employees with ease of out performance, the ability to enter flow state, regularly, and avoid a distracting and difficult productivity environment.</p>
                <p>Customers can look forward and improve EPT and productivity results by running engagements to conduct thorough business process mapping to understand human needs fully. Discover exactly what a human does, step by step, for each macro-task and micro-task before designing a better UI. To address these challenges, businesses should:businesses can unlock significant productivity gains. As demonstrated by the logarithmic relationship between response times and productivity, even small improvements in system performance can yield substantial benefits. Prioritize user experience in business system design, focusing on simplicity and efficiency. Consider Google.com as an exemplar of simplicity, singularity, clarity, beauty, and speed in interface design. Optimize EPT to stay as close to the 300ms threshold as possible (use the EPT clock in Sandboxes). Design interfaces that support micro-task completion rather than solely focusing on macro processes. Invest in resolving data silos and improving data processing efficiency. This may involve utilizing Signature architects to assist with reliability and especially ADRs for architectural issues, build better queries, improve database indices, and implement effective archival processes, etc.. Eliminate unneeded components and focus on essential elements. For example, in customer service scenarios, agents should focus solely on the queue, conversation context, and AI-generated recommendations. Regularly assess and optimize system performance based on user feedback and productivity metrics. By addressing these areas, businesses can create more effective human-to-business-system interfaces, leading to improved employee satisfaction, increased productivity, and ultimately, better business outcomes</p>
                <p className="text-right mt-4 italic">- M.W. 2024: SFDC CSG 2024</p>
              </div>
            </div>
          </details>
        </div>
      </div>
    </footer>
  );
}