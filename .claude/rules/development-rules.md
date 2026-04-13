# Development Rules

Core rules that all development agents must follow during implementation.

## General Rules

### Code Quality
1. **Type Safety**: Always use TypeScript strict mode
   - No `any` types without explicit justification
   - Proper type definitions for all functions
   - Interface definitions for data structures

2. **Code Style**:
   - Follow project ESLint configuration
   - Use oxlint for fast linting
   - Format with oxfmt
   - No unused imports or variables

3. **Error Handling**:
   - Always handle potential errors
   - Provide meaningful error messages
   - Use error boundaries for React components
   - Log errors appropriately

### Testing Requirements
1. **Test Coverage**:
   - Minimum 80% code coverage
   - 100% coverage for critical paths
   - Test all error scenarios
   - Test edge cases

2. **Test Quality**:
   - Tests must be deterministic
   - Tests must be independent
   - Tests must be fast
   - Tests must be descriptive

### Documentation
1. **Code Comments**:
   - Comment complex logic
   - Document non-obvious decisions
   - Explain why, not what
   - Keep comments up to date

2. **API Documentation**:
   - Document all public APIs
   - Include usage examples
   - Document parameter types
   - Document return types

## Frontend-Specific Rules (Web Dev Agent)

### React Best Practices
1. **Component Design**:
   - Keep components small and focused
   - Use composition over inheritance
   - Prefer function components
   - Use hooks appropriately

2. **State Management**:
   - Server state: TanStack Query
   - Client state: Zustand
   - Form state: React hooks or form library
   - Don't prop drill (use context)

3. **Performance**:
   - Use React.memo for expensive components
   - Use useMemo for expensive calculations
   - Use useCallback for function references
   - Code split by route
   - Lazy load components

4. **Accessibility**:
   - Use semantic HTML
   - ARIA labels when needed
   - Keyboard navigation support
   - Screen reader support
   - Color contrast (4.5:1 ratio)

5. **Design Quality**:
   - UI 컴포넌트 구현 시 관련 디자인 스킬 참조 (`/frontend-design`, `/ui-ux-pro-max`)
   - 애니메이션 추가 시 `/emil-design-eng` 의사결정 프레임워크 적용
   - 인터랙션 디테일은 `/make-interfaces-feel-better` 가이드라인 준수

6. **Animation Principles**:
   - UI 애니메이션은 300ms 이하 유지
   - `ease-in` 절대 사용 금지 (`ease-out` 또는 커스텀 커브 사용)
   - `scale(0)`에서 시작하는 애니메이션 금지 (`scale(0.95)` + `opacity` 사용)
   - 키보드 액션에는 애니메이션 금지

7. **Accessibility Basics**:
   - interactive 요소 최소 터치 영역 44x44px
   - 색 대비 4.5:1 (일반 텍스트), 3:1 (대형 텍스트)
   - `prefers-reduced-motion` 존중

### Component Structure
```typescript
// Good component structure
interface ComponentProps {
  // Prop definitions
}

export function Component({ prop1, prop2 }: ComponentProps) {
  // 1. Hooks
  const [state, setState] = useState()
  const query = useQuery()

  // 2. Event handlers
  const handleClick = useCallback(() => {
    // Handle event
  }, [])

  // 3. Effects
  useEffect(() => {
    // Side effect
  }, [])

  // 4. Derived values
  const derivedValue = useMemo(() => {
    // Calculate
  }, [])

  // 5. Conditional rendering
  if (condition) {
    return <Fallback />
  }

  // 6. Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

## Backend-Specific Rules (Server Dev Agent)

### Database Design
1. **Schema Design**:
   - Normalize to 3NF
   - Use appropriate data types
   - Add constraints for data integrity
   - Index strategic columns

2. **Security**:
   - Always use RLS
   - Validate inputs
   - Use parameterized queries
   - Never trust client input
   - Audit sensitive operations

3. **Performance**:
   - Use EXPLAIN ANALYZE
   - Add strategic indexes
   - Optimize query structure
   - Consider caching
   - Use database functions for complex operations

### Migration Rules
1. **Migration Design**:
   - Migrations must be reversible
   - No destructive changes without backup
   - Test migrations on staging first
   - Document breaking changes

2. **Rollback Strategy**:
   - Always have rollback plan
   - Test rollback procedure
   - Document rollback steps

## Integration Rules (Both Agents)

### API Contracts
1. **Type Safety**:
   - Define TypeScript interfaces for all APIs
   - Keep frontend and backend types in sync
   - Document API contracts
   - Version APIs when breaking changes

2. **Error Handling**:
   - Consistent error format
   - Proper HTTP status codes
   - Meaningful error messages
   - Log errors appropriately

### Testing Integration
1. **Integration Tests**:
   - Test frontend-backend integration
   - Test API contracts
   - Test error scenarios
   - Test data flow

## Code Review Checklist

Before marking task complete:

### General
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Code formatted with oxfmt
- [ ] Tests written and passing
- [ ] Comments added for complex logic

### Frontend
- [ ] Components are small and focused
- [ ] No prop drilling
- [ ] Performance optimized
- [ ] Accessibility verified
- [ ] Responsive design works

### Backend
- [ ] RLS policies implemented
- [ ] Input validation added
- [ ] Parameterized queries used
- [ ] Performance optimized
- [ ] Migrations tested

### Integration
- [ ] API contracts defined
- [ ] Error handling consistent
- [ ] Integration tests passing
- [ ] Data flow verified

## Forbidden Patterns

### ❌ Anti-Patterns to Avoid

**Frontend**:
- Giant components (break them down)
- Prop drilling (use context)
- Unnecessary re-renders (memoize)
- Inline functions in JSX (use useCallback)
- Ignoring TypeScript errors

**Backend**:
- N+1 queries (use joins)
- Missing RLS (always add)
- SQL injection (use parameters)
- Unvalidated input (always validate)
- Missing indexes (optimize queries)

## Quality Gates

Code must pass these checks before completion:

1. **Type Checking**: `pnpm typecheck` ✅
2. **Linting**: `pnpm lint` ✅
3. **Testing**: `pnpm test` ✅
4. **Build**: `pnpm build` ✅
5. **Manual Testing**: Verified in browser ✅

## Continuous Improvement

### Learning from Failures
- Review `.context/failure-analysis.md` regularly
- Identify recurring issues
- Update these rules based on learnings
- Share knowledge with team

### Process Improvement
- Suggest workflow improvements
- Identify bottlenecks
- Propose tooling improvements
- Document best practices

---

**These rules ensure consistent, high-quality code across all development work.**
