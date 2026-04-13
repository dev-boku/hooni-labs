# Auto-Pilot Mode (YOLO)

Fully automated development workflow. Run the complete cycle from planning to verification without human intervention.

## What This Does

This command automates the entire development cycle:
1. **Planning** (`/1-plan`): PM Agent creates PRD and task list
2. **Test Planning** (`/2-test`): Test Expert Agent creates test specifications
3. **Implementation** (`/3-impl`): Web Dev and/or Server Dev Agents implement features
4. **Verification** (`/4-verify`): QA Agent runs tests and validates quality

## How It Works

### Phase 1: Planning
- PM Agent analyzes requirements
- Creates comprehensive PRD in `.context/prd.md`
- Breaks down into tasks in `.context/tasks.json`
- **TPM Agent performs technical review**: 기술적 실현 가능성, 아키텍처 영향, API 설계, DB 스키마, 리스크 평가
- **Architect Agent performs infrastructure review**: Cloudflare 배포 전략, D1 한계, 환경 변수, CI/CD, 비용, 보안 점검
- PM Agent incorporates reviews and finalizes plan

### Phase 2: Test Planning (상세 설계 + TDD)
For each task, Test Expert Agent leads with TPM Agent and PM Agent collaborating:

**Phase 2-1: Detailed Design (상세 설계)**
- Test Expert analyzes PRD + tasks, writes detailed design in `.context/design/{task-id}.md`
- PM Agent clarifies business requirements and priorities
- TPM Agent reviews API contracts, DB schema, state management
- **User Q&A**: Test Expert asks clarifying questions via `AskUserQuestion` (UI/UX, business logic, data flow, trade-offs)
- Multi-agent review: TPM (tech), PM (business), Test Expert (testability)

**Phase 2-2: Failing Test Cases (TDD)**
- Test Expert writes failing tests based on detailed design
- Test plans in `.context/test-plans/{task-id}.md`
- All tests intentionally FAIL (implementation comes in Phase 3)

### Phase 3: Implementation
For each task, appropriate Dev Agents:
- Review task details and test plan
- Consult TPM Agent if needed
- Implement features
- Write tests
- Handle conflicts with TPM mediation

### Phase 4: Verification
For each completed task, QA Agent:
- Runs all tests
- Analyzes results
- **If pass**: Mark complete, move to next task
- **If fail**: Create failure report, assign back to Dev Agent

### Iteration Loop
- Failed tasks go back to Dev Agent (up to 3 attempts)
- After 3 failures: Escalate to user with detailed analysis
- Continue until all tasks complete or blocked

## Usage

```bash
# Start auto-pilot with a feature description
/0-auto [feature description]

# Example
/0-auto Implement user authentication with email and password
```

## What You'll See

### Progress Updates
Auto-pilot provides regular updates:
- Current phase and task
- Agent currently working
- Decisions made
- Failures and retries
- Quality metrics

### Artifacts Created
All artifacts in `.context/`:
- `prd.md`: Product requirements document
- `tasks.json`: Task list with status
- `design/{task-id}.md`: Detailed design documents (UI, API, DB, state, errors)
- `test-plans/{task-id}.md`: Test specifications
- `failure-analysis.md`: Failure reports (if any)
- `progress.json`: Overall progress tracking

### Decision Points
Auto-pilot will ask for input when:
- Requirements are ambiguous
- Technical conflicts can't be resolved
- After 3 consecutive failures
- Quality gates can't be met

## When to Use

### Good For:
- Well-defined features with clear requirements
- Routine implementations (CRUD, standard features)
- Refactoring tasks
- Bug fixes with clear reproduction steps
- Proof of concepts

### Not Good For:
- Ambiguous or exploratory work
- Features requiring user feedback
- Complex architectural decisions
- Performance-critical paths (use manual mode)
- Security-sensitive features (use manual mode)

## Safety Mechanisms

### Quality Gates
Auto-pilot won't proceed unless:
- All tests passing
- No type errors
- Build successful
- No critical bugs

### Failure Handling
- 1st failure: Retry with feedback
- 2nd failure: TPM Agent reviews approach
- 3rd failure: Escalate to user

### Conflict Resolution
- Web Dev ↔ Server Dev conflicts: TPM Agent mediates
- Unresolvable conflicts: Escalate to user

### Progress Preservation
- All work saved to `.context/`
- Can resume after interruption
- Full history of decisions and failures

## Monitoring Progress

### Check Status
```bash
# View current progress
cat .context/progress.json

# View task list
cat .context/tasks.json

# View failures
cat .context/failure-analysis.md
```

### Pause/Resume
```bash
# Pause and review
# (Auto-pilot will pause at decision points)

# Resume with same command
/0-auto --continue
```

## Output Format

### Success Case
```markdown
✅ Auto-Pilot Complete

Summary:
- Tasks completed: 5/5
- Quality gates: All passed
- Failures: 0

Artifacts:
- PRD: .context/prd.md
- Tasks: .context/tasks.json
- Detailed designs: .context/design/
- Test plans: .context/test-plans/
- Progress: .context/progress.json

Next steps:
1. Review artifacts
2. Test manually in browser
3. Deploy to staging
4. Create PR if needed
```

### Failure Case
```markdown
⚠️ Auto-Pilot Paused

Blocked: task-003 (User authentication)
Reason: 3 consecutive failures

Issue:
[Detailed failure analysis]

Recommendation:
[TPM Agent recommendation]

Action required:
Please review and provide guidance:
1. [Option 1]
2. [Option 2]
3. [Alternative approach]

Resume with: /0-auto --continue
```

## Customization

### Agent Behavior
Each agent follows their specific guidelines:
- PM Agent: `.claude/agents/pm-agent.md`
- TPM Agent: `.claude/agents/tpm-agent.md`
- Architect Agent: `.claude/agents/architect-agent.md`
- Test Expert Agent: `.claude/agents/test-expert-agent.md`
- Web Dev Agent: `.claude/agents/web-dev-agent.md`
- Server Dev Agent: `.claude/agents/server-dev-agent.md`
- QA Agent: `.claude/agents/qa-agent.md`

### Workflow Override
You can specify specific phases:
```bash
# Only planning and test planning
/0-auto --phase plan,test "Feature description"

# Only implementation (requires existing plans)
/0-auto --phase impl

# Only verification (requires completed implementation)
/0-auto --phase verify
```

## Best Practices

### Before Running Auto-Pilot
1. **Clear requirements**: Have well-defined feature requirements
2. **Context setup**: Ensure `.context/` exists
3. **Baseline check**: Verify tests pass initially
4. **Time availability**: Ensure you have time to monitor

### During Auto-Pilot
1. **Monitor progress**: Check regular updates
2. **Be available**: Respond to decision points promptly
3. **Review artifacts**: Check PRD and test plans
4. **Test manually**: Verify in browser after completion

### After Auto-Pilot
1. **Review all artifacts**: Ensure quality meets standards
2. **Manual testing**: Test user flows in browser
3. **Code review**: Review generated code
4. **Deploy**: Deploy to staging/production

## Limitations

### Auto-Pilot Can't:
- Make subjective design decisions
- Handle ambiguous requirements
- Replace manual testing entirely
- Guarantee optimal solutions
- Handle complex architectural changes

### Auto-Pilot Can:
- Follow well-defined processes
- Implement standard features
- Write and run tests
- Fix bugs with clear root causes
- Maintain code quality standards

## Troubleshooting

### Auto-Pilot Stuck
1. Check `.context/progress.json` for current state
2. Review `.context/failure-analysis.md` for issues
3. Use `--continue` to resume
4. If still stuck, provide feedback

### Quality Failures
1. Review failure analysis for root cause
2. Check if test plan is adequate
3. Verify requirements are clear
4. Consider manual intervention

### Performance Issues
1. Check task size (break down if too large)
2. Verify test efficiency
3. Review dependencies
4. Consider running phases separately

## Example Workflow

```bash
# Start auto-pilot
/0-auto Implement user profile page with avatar upload

# Auto-pilot progress:
# ✓ PM Agent creating PRD...
# ✓ TPM Agent technical review...
# ✓ Architect Agent infra review...
# ✓ Task list created: 8 tasks
# ✓ Test Expert Agent writing detailed design...
# ✓ User Q&A: UI/UX decisions clarified
# ✓ TPM + PM + Test Expert design review...
# ✓ Test Expert Agent writing failing tests (TDD)...
# ✓ Web Dev Agent implementing UI components...
# ✓ Server Dev Agent setting up storage...
# ✓ QA Agent running tests...
# ⚠️ Task failed: avatar upload size validation
# ✓ Retry 1: Fixed validation logic
# ✓ QA Agent re-running tests...
# ✓ All tests passing
# ✅ Auto-pilot complete

# Review results
cat .context/progress.json
cat .context/tasks.json

# Test manually
pnpm dev
# Open browser and test

# Deploy when ready
git add .
git commit -m "feat: implement user profile page"
git push
```

## Tips for Success

1. **Start small**: Test with simple features first
2. **Be specific**: Clear requirements reduce decision points
3. **Monitor closely**: Check in regularly during first runs
4. **Learn failures**: Review failure patterns to improve prompts
5. **Iterate**: Refine agent behaviors based on results

---

**Ready to automate? Provide a clear feature description and auto-pilot will handle the rest!**