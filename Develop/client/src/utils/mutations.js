import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password){
            token
            user {
                _id
                username
            }
        }
    }`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
            bookCount
            savedBooks {
               authors
                bookId
                image
                link
                title
                description
              }
            }
        }
    }`;

export const SAVE_BOOK = gql`
    mutation saveBook($input: BookInput!) {
        saveBooks(input: $input) {
            _id
            username
            email
            bookCount
            savedBook {
                bookId
                title
                description
                authors
                image
                link
            }
        }
    }`;

export const DELETE_BOOK = gql`
    mutation deleteBook($userId: ID!, $bookId: String!) {
        deleteBook(userId: $userId, bookId: $bookId) {
            _id
            username
            email
            bookCount
            savedBooks{
                bookId
                title
                description
                authors
                image
                link
            }
        }
    }`;