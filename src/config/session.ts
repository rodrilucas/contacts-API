import Session from "connect-pg-simple";
import session from "express-session";

const PgSession = Session(session);

export = session({
  secret: process.env.SECRET_SESSION!,
  resave: false,
  saveUninitialized: false,
  store: new PgSession({
    conString: process.env.DATABASE_URL,
    tableName: "Session",
  }),
  cookie: { 
    maxAge: 6 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  },
});
