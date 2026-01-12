import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { log } from "console";


export const SessionInfo = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
	const request = context.switchToHttp().getRequest();
	return request.session;
  },
);