---
title: "Building a Legacy API Refactoring Workflow with Claude Code"
slug: "legacy-api-refactor-workflow"
summary: "Turning legacy system analysis, API documentation, implementation, automated testing, and progress tracking into a repeatable agent-driven workflow."
publishedAt: "2026-08-08"
type: "build"
status: "in-progress"
version: "v1.0.0"
tags:
  - Claude Code
  - Backend Refactoring
  - Legacy Modernization
  - Agentic Workflow
isPublished: true
---

## Refactoring is more than rewriting code

I have recently been working on refactoring a legacy backend project. The most difficult part is not translating old code into a new language. It is preserving the system's existing behavior, business rules, and API contracts throughout the migration.

In a legacy system, knowledge is often scattered across routes, data models, service layers, database queries, and error-handling paths. Some business decisions are not documented at all and can only be reconstructed by tracing the code and its dependencies. Starting with implementation too early can easily produce a system that looks cleaner but no longer behaves the same way.

To make this process safer and more systematic, I am using Claude Code to build a staged refactoring workflow. The goal is not to ask an agent to rewrite the entire project in one pass. Instead, I break the migration into small tasks with clear boundaries, verifiable outcomes, and repeatable execution steps.

## Stage one: recovering the API contract

The workflow begins by analyzing the legacy project and generating structured API documentation. This documentation goes beyond endpoints and HTTP methods. It aims to recover the complete intent and behavior of each API, including:

- request parameters, response structures, and their data types;
- required fields, default values, and nullable behavior;
- the API's role within the broader business workflow;
- important business rules, state transitions, and authorization requirements;
- dependencies on databases, external services, and other modules;
- success and failure paths, including expected errors;
- test scenarios that can be used to validate the new implementation.

This documentation becomes an intermediate layer between the old and new systems. It turns behavior that was previously implicit in the code into a reviewable contract. It also prevents the implementation agent from having to rediscover the entire legacy codebase every time it works on an endpoint.

## Stage two: implementing in the target stack

Once the contract is clear, I provide the target backend language, framework, project structure, and coding conventions. The agent can then migrate each endpoint into the new system while working within explicit architectural constraints.

For every endpoint, the agent is expected to:

1. Read the relevant API documentation and legacy implementation.
2. Confirm the data types, business rules, and dependencies.
3. Implement the endpoint according to the new project's architecture.
4. Add or update the relevant tests.
5. Run the tests and any required static checks.
6. Create a commit only after all verification has passed.

This turns code generation into a delivery pipeline with a quality gate. A failed test means the task is not complete. The agent must investigate the failure, correct the implementation, and rerun the checks until the result satisfies the documented contract.

## Packaging repeated tasks as Skills

Once the workflow for a single endpoint becomes stable, many of its steps are repetitive: reading documentation, locating the legacy code, implementing the replacement, testing its behavior, reviewing the changes, updating the status, and committing the result.

Rather than placing all of that logic inside one large prompt, I define several focused Claude Code Skills. Some test individual API endpoints, one performs code review, and another creates a commit only when the required checks have passed. Each Skill owns a specific responsibility and can be reused independently or composed into a larger workflow.

One additional Skill orchestrates the batch implementation of API endpoints. Before execution begins, I create a plan containing an ordered list of APIs. I can then assign a range—such as APIs 1 through 10—and the Skill processes that range sequentially. For every endpoint, it loads the planned context, implements the API, runs the endpoint tests, invokes the code review process, and commits the verified result before moving to the next item.

This composition gives the batch workflow an important property: scale does not remove the quality gates. Whether the agent is implementing one endpoint or ten, each endpoint must complete the same test, review, and commit cycle. A failure stops that item from being treated as complete and leaves a clear state from which the work can be investigated or resumed.

The value of these Skills is not limited to saving prompt-writing time. They turn engineering conventions into reusable execution standards: which context must be reviewed, which checks cannot be skipped, what qualifies as complete, and how failures should be recorded and recovered.

## Tracking the migration

Batch execution does not mean handing every task to an agent and losing visibility into the process. I also generate a tracker that records the migration state of every endpoint. The states can include:

- pending analysis;
- documentation generated;
- implementation in progress;
- test failure or blocked;
- tests passed;
- committed.

The tracker also records the API identifier, target module, related documentation, commit, and implementation notes. If the workflow is interrupted, the next run can resume from an explicit state. It also gives me a quick view of what is complete, what requires a human decision, and how far the overall migration has progressed.

## Defining the boundary between human and agent

Automation does not eliminate the need for human judgment. In a legacy migration, automated tests can prove that known expectations pass, but they cannot guarantee that every implicit business behavior has been understood correctly. Human-in-the-loop review remains a required quality gate after implementation.

The central question in that review is behavioral parity: does the refactored endpoint behave like the legacy API? I compare the new and old implementations across the dimensions that matter to their consumers:

- response body structure, field names, and data types;
- status codes, headers, and error responses;
- business rules and observable side effects;
- behavior for invalid input, missing data, and boundary cases;
- authorization rules and dependency interactions.

I repeatedly reinforce this requirement with Claude Code: the new API is not correct merely because it compiles, passes a basic test, or follows the new architecture. It must also align with the legacy API's externally observable contract. When the behavior is unclear, the agent is expected to investigate the old implementation and produce evidence rather than silently make an assumption.

This defines a practical division of responsibility. Agents handle repeatable work with explicit rules and automated verification. I remain responsible for confirming business meaning, challenging uncertain interpretations, resolving high-risk trade-offs, and approving the final behavior.

## Turning every migration into an audit trail

Verification is only useful over the long term if its results are recorded. After each endpoint is refactored, I require the workflow to update its documentation with the new implementation details and the evidence collected during validation.

The record connects the legacy contract, the new endpoint, relevant test coverage, review findings, known differences, and the resulting commit. Together with the tracker, it answers not only whether an endpoint was migrated, but also how it was verified and why the team considered it complete.

This documentation creates an audit trail for future reviews. If a regression appears later, I can trace the original assumptions, compare the old and new behaviors, inspect the validation performed at the time, and identify which decision may need to be revisited. Documentation therefore becomes part of the migration output rather than an optional task deferred until the end.

For this project, the value of Claude Code is not simply that it can produce code faster. Its real value is helping connect legacy analysis, contract extraction, implementation, behavioral verification, and progress tracking into a sustainable engineering workflow.

## What comes next

The workflow is still evolving. My next steps are to improve the API documentation template, task dependency handling, failure recovery, and the rules that synchronize execution results with the tracker. I also want to evaluate how reliably the workflow performs when the APIs involve more complex business logic and cross-module dependencies.

The long-term goal is not to complete the entire refactor in one autonomous run. It is to create an auditable, recoverable, and scalable migration path in which every endpoint has a traceable source, implementation, test result, and completion record.
