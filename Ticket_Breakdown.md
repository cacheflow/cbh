# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Add Facility Agent ID to the Agents Table 

#### Description 
As a facility, I want to be able to add a custom id for agents that I work with, so I can easily track and manage reports in my facility. 

#### Acceptance Criteria
- When creating a new agent, I should be able to add a facility agent id.
- When updating an existing agent, I should be able to add a facility agent id.
- When creating/updating an agent, I should not be able to add duplicate facility agent ids.


### Implementation Details
- Create a migration to add a new column called "facility_agent_id" to the agents table with the type of string to account for agent IDs being potentially integers or UUIDs.  
- Add a multicolumn index to the agents table with the facility_agent_id and facility_id, so a facility does not add the same facility agent id twice. 

### Time Effort 
- 2 Story Points


### Add Facility Agent ID to Generated Reports

#### Description 
- As a facility, I want to see a facility agent ID when I generate a report.

#### Acceptance Criteria
- When viewing a report and a facility agent ID is present, I should see a facility agent ID.
- When viewing a report and the facility agent ID is not present, I should see an empty string- When viewing a report, I should only see facility agent IDs of agents belonging to my facility. 

### Blocked By 
- Add Facility Agent ID to the Agents Table  

### Implementation Details
- In the generate report code, retrieve and add the facility agent ID to the generated report.

### Time Effort 
- 2 Story Points




### Allow Generating of Shift Reports by Facility Agent Id

#### Description 
As a facility, I want to be able to generate a shift report of a facility agent using their facility agent ID.


#### Acceptance Criteria
- When generating a shift report of a facility agent, I should be able to generate a report by using the facility agent's ID.
- When generating a shift report of a facility agent, I should see an error if the facility agent ID does not exist.
- When generating a shift report of a facility agent, I should be shown a message/alert when the report creation is occurring
- When generating a shift report of a facility agent, I should see an error if generating a report fails.
- When generating a shift report of a facility agent, I should see a successful message/email when the report is generated.


### Implementation Details

- Create a function named "getShiftsByFacilityAgentId" to retrieve the shift reports of a facility agent in batches. 
- Ensure the agent exists with the given facility agent ID before trying to generate the 
report.
- Create a background job to retrieve the shift reports and generate the PDF report. 
- Write the PDF in chunks to ensure efficient use of memory. 
- Send an email or display a notification to the facility when report is generated

### Blocked By 
- Add Facility Agent ID to the Agents Table  

### Time Effort 
- 5 Story Points