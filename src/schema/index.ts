import { gql } from 'apollo-server';

export const typeDefs = gql`
  enum Role {
    ADMIN
    EMPLOYEE
  }

  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String!
    subjects: [String!]!
    attendance: Int!
    email: String!
    role: Role!
    createdAt: String!
  }

  input EmployeeInput {
    name: String!
    age: Int!
    class: String!
    subjects: [String!]!
    attendance: Int!
    email: String!
    password: String!
    role: Role
  }

  input EmployeeFilterInput {
    name: String
    class: String
  }

  input EmployeeSortInput {
    field: String!
    order: String! # ASC or DESC
  }

  type Query {
    employee(id: ID!): Employee
    employees(filter: EmployeeFilterInput, sort: EmployeeSortInput, skip: Int, take: Int): [Employee!]!
  }

  type Mutation {
    addEmployee(input: EmployeeInput!): Employee!
    updateEmployee(id: ID!, input: EmployeeInput!): Employee!
    login(email: String!, password: String!): AuthPayload!
  }

  type AuthPayload {
    token: String!
    user: Employee!
  }
`;
