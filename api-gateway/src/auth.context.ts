import { UnauthorizedException } from '@nestjs/common';

export const authContext = ({ req }) => {
  if (req.headers?.authorization) {
    // Validate jwt
    return { user: { id: '12' } };
  }
  throw new UnauthorizedException();
};
