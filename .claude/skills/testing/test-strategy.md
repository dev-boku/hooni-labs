# Test Strategy Skill

Specialized skill for designing comprehensive test strategies.

## When to Use
- Planning test coverage for a feature
- Designing test suites
- Identifying testing gaps
- Establishing quality benchmarks

## Testing Pyramid

```
        E2E Tests
       /          \
      /            \
     /  Integration  \
    /      Tests      \
   /__________________\
  /    Unit Tests      \
 /______________________\
```

### Unit Tests (70%)
- **Focus**: Individual functions and components
- **Speed**: Fast (< 100ms per test)
- **Isolation**: Mock external dependencies
- **Examples**:
  - Utility functions
  - Component rendering
  - Business logic
  - Data transformations

### Integration Tests (20%)
- **Focus**: Component interactions
- **Speed**: Medium (< 1s per test)
- **Dependencies**: Real or mocked integrations
- **Examples**:
  - API integration
  - Database operations
  - Component + hook interactions
  - State management flows

### E2E Tests (10%)
- **Focus**: Critical user journeys
- **Speed**: Slow (1-10s per test)
- **Environment**: Real browser and backend
- **Examples**:
  - Complete user workflows
  - Multi-page journeys
  - Authentication flows
  - Payment processes

## Coverage Requirements

### Minimum Targets
- **Unit Tests**: 80%+ code coverage
- **Critical Paths**: 100% coverage
- **Error Handling**: 100% coverage
- **Public APIs**: 100% coverage

### What to Test

**Always Test**:
- Business logic
- Data transformations
- API integrations
- User interactions
- Error scenarios
- Edge cases
- Boundary conditions

**Don't Test**:
- Third-party library internals
- Auto-generated code
- Simple getters/setters
- Trivial components
- CSS/styling

## Test Categories

### 1. Happy Path Tests
- Expected user behavior
- Normal data flow
- Success scenarios

### 2. Edge Case Tests
- Empty inputs
- Null/undefined values
- Boundary values (min/max)
- Zero and negative numbers
- Special characters

### 3. Error Tests
- Network failures
- Invalid inputs
- Unauthorized access
- Server errors
- Timeouts

### 4. Integration Tests
- Component interactions
- API calls
- Database operations
- State updates

### 5. Performance Tests
- Response times
- Memory usage
- Render performance
- Query efficiency

## Test Design Principles

### AAA Pattern (Arrange-Act-Assert)
```typescript
test('adds two numbers', () => {
  // Arrange
  const a = 1
  const b = 2

  // Act
  const result = add(a, b)

  // Assert
  expect(result).toBe(3)
})
```

### Test Independence
- No test dependencies
- Run in any order
- Isolated setup/teardown
- No shared state

### Test Clarity
- Descriptive names
- One assertion per test
- Clear setup
- Obvious expectations

### Test Reliability
- Deterministic (same result every time)
- No flaky tests
- Proper mocking
- Stable test data

## Common Testing Scenarios

### React Components
```typescript
describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByText('Click me')).toBeDisabled()
  })
})
```

### API Integration
```typescript
describe('User API', () => {
  it('fetches user data', async () => {
    const mockUser = { id: 1, name: 'John' }
    vi.spyOn(api, 'getUser').mockResolvedValue(mockUser)

    const user = await getUser(1)

    expect(user).toEqual(mockUser)
    expect(api.getUser).toHaveBeenCalledWith(1)
  })

  it('handles errors', async () => {
    vi.spyOn(api, 'getUser').mockRejectedValue(new Error('Not found'))

    await expect(getUser(1)).rejects.toThrow('Not found')
  })
})
```

### Database Operations
```typescript
describe('User Repository', () => {
  it('creates user with valid data', async () => {
    const userData = { email: 'test@example.com', name: 'Test' }
    const user = await createUser(userData)

    expect(user.id).toBeDefined()
    expect(user.email).toBe(userData.email)
  })

  it('rejects duplicate email', async () => {
    const userData = { email: 'test@example.com', name: 'Test' }
    await createUser(userData)

    await expect(createUser(userData)).rejects.toThrow()
  })
})
```

## Test Data Strategy

### Fixtures
```typescript
// test/fixtures/users.ts
export const mockUsers = {
  valid: {
    id: 1,
    email: 'test@example.com',
    name: 'Test User'
  },
  invalid: {
    id: 2,
    email: 'invalid-email',
    name: ''
  }
}
```

### Factories
```typescript
// test/factories/user.ts
export const createUser = (overrides = {}) => ({
  id: 1,
  email: 'test@example.com',
  name: 'Test User',
  ...overrides
})
```

## Quality Metrics

### Track These Metrics
- **Coverage**: Percentage of code covered
- **Pass Rate**: Percentage of tests passing
- **Flaky Rate**: Percentage of unreliable tests
- **Execution Time**: How long tests take to run
- **Bug Escape Rate**: Bugs found in production

### Target Benchmarks
- Coverage: > 80%
- Pass Rate: 100%
- Flaky Rate: < 2%
- Execution Time: < 5 minutes
- Bug Escape Rate: < 5%

## Anti-Patterns to Avoid

### ❌ Testing Implementation Details
```typescript
// Bad
it('uses useState hook', () => {
  expect(Component.prototype.useState).toHaveBeenCalled()
})

// Good
it('manages state correctly', () => {
  render(<Component />)
  expect(screen.getByText('Loading')).toBeInTheDocument()
})
```

### ❌ Brittle Tests
```typescript
// Bad
it('renders third div with class button', () => {
  render(<Component />)
  expect(container.children[0].children[2]).toHaveClass('button')
})

// Good
it('renders submit button', () => {
  render(<Component />)
  expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
})
```

### ❌ Testing Third-Party Code
```typescript
// Bad
it('works with React', () => {
  expect(React).toBeDefined()
})

// Good - test your usage of React
it('renders React component', () => {
  render(<MyComponent />)
  expect(screen.getByText('Hello')).toBeInTheDocument()
})
```

## Best Practices

1. **Write Tests First**: TDD approach
2. **Test Behavior, Not Implementation**: Focus on what, not how
3. **Keep Tests Simple**: One assertion per test
4. **Use Descriptive Names**: Test names should document behavior
5. **Mock External Dependencies**: Control external factors
6. **Test Edge Cases**: Don't just test happy paths
7. **Keep Tests Fast**: Slow tests won't be run
8. **Review Test Coverage**: Aim for high coverage, but quality > quantity

---

**This skill ensures comprehensive test coverage and high-quality test suites.**
