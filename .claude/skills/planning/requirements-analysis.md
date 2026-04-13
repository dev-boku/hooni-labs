# Requirements Analysis Skill

Specialized skill for analyzing and clarifying project requirements.

## When to Use
- Starting a new feature
- Requirements are ambiguous or unclear
- Need to identify edge cases
- Planning complex features

## Analysis Framework

### 1. Stakeholder Analysis
- Who are the users?
- What are their goals?
- What are their pain points?
- What value does this feature provide?

### 2. Functional Requirements
- What should the system do?
- User interactions
- Data inputs and outputs
- Business logic
- Integration points

### 3. Non-Functional Requirements
- **Performance**: Response times, throughput
- **Security**: Authentication, authorization, data protection
- **Scalability**: Concurrent users, data volume
- **Reliability**: Uptime, error handling
- **Usability**: UX, accessibility
- **Maintainability**: Code quality, documentation

### 4. Technical Constraints
- Technology stack limitations
- API constraints
- Database constraints
- Third-party dependencies
- Time and resource constraints

### 5. Edge Cases
- Empty states
- Error conditions
- Boundary conditions
- Concurrent operations
- Data inconsistencies

## Questions to Ask

### Clarifying Questions
1. What problem are we solving?
2. Who is this for?
3. What does success look like?
4. What are the must-haves vs nice-to-haves?
5. What could go wrong?
6. What are the dependencies?
7. What are the assumptions?

### Technical Questions
1. What data do we need?
2. How do we get/transform/store it?
3. What are the performance requirements?
4. What are the security considerations?
5. What integrations are needed?
6. What are the technical risks?

### UX Questions
1. What is the user journey?
2. What are the edge cases in the flow?
3. How should errors be presented?
4. What are the accessibility requirements?
5. How should this work on mobile?

## Output Format

### Requirements Summary
```markdown
## Requirements Analysis

### User Stories
- As a [user], I want [feature] so that [benefit]

### Functional Requirements
1. **[Requirement 1]**
   - Description: [Details]
   - Acceptance Criteria: [Criteria]
   - Priority: [High/Medium/Low]

### Non-Functional Requirements
- Performance: [Requirements]
- Security: [Requirements]
- Scalability: [Requirements]

### Technical Constraints
- [Constraint 1]
- [Constraint 2]

### Edge Cases Identified
- [Edge case 1]
- [Edge case 2]

### Open Questions
- [Question 1]
- [Question 2]
```

## Best Practices

1. **Be Specific**: Avoid vague requirements
2. **Be Testable**: Every requirement should be verifiable
3. **Prioritize**: Not all requirements are equal
4. **Think Edge Cases**: What could go wrong?
5. **Consider Constraints**: Technology, time, resources
6. **Ask Why**: Understand the rationale
7. **Document Assumptions**: Make implicit explicit

## Common Pitfalls

- **Too Vague**: "Make it fast" → "Response time < 500ms"
- **Unrealistic**: "100% uptime" → "99.9% uptime"
- **Missing Edge Cases**: What if X is null/empty/invalid?
- **Ignoring Constraints**: Technical, time, resource limits
- **No Success Metrics**: How do we know it's done?
- **Assumptions Not Documented**: Implicit requirements

## Examples

### Good Requirement
"User should be able to reset password via email link. Link expires in 24 hours. Password must be at least 8 characters with uppercase, lowercase, and number."

### Bad Requirement
"User should be able to reset password." (Missing: how? what are the constraints? validation?)

---

**This skill helps ensure requirements are clear, complete, and testable before implementation begins.**
