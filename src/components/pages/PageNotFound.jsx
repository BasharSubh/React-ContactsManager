import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFoundContainer = styled.div`
  text-align: center;
  margin: 100px;
`;

const NotFoundHeading = styled.h1`
  font-size: 28px;
  color: #ff0000;
`;

const NotFoundMessage = styled.p`
  font-size: 18px;
`;

const BackButton = styled(Link)`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  text-decoration: none;
`;

const PageNotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundHeading>Page Not Found</NotFoundHeading>
      <NotFoundMessage>Sorry, the page you are looking for does not exist.</NotFoundMessage>
      <BackButton to="/">Back to Home</BackButton>
    </NotFoundContainer>
  );
};

export default PageNotFound;
