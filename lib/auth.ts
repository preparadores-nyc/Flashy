import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

type JwtPayload = {
  userId: string;
  role: "RIDER" | "DRIVER" | "ADMIN";
};

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

export function getAuthFromRequest(request: NextRequest): JwtPayload {
  const authorization = request.headers.get("authorization") || "";
  const token = authorization.replace("Bearer ", "").trim();
  if (!token) {
    throw new Error("Missing bearer token");
  }

  return verifyToken(token);
}
