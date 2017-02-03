--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: followers; Type: TABLE; Schema: public; Owner: piyush
--

CREATE TABLE followers (
    id integer,
    follower_id integer
);


ALTER TABLE followers OWNER TO piyush;

--
-- Name: tweets_id_seq; Type: SEQUENCE; Schema: public; Owner: piyush
--

CREATE SEQUENCE tweets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tweets_id_seq OWNER TO piyush;

--
-- Name: tweets; Type: TABLE; Schema: public; Owner: piyush
--

CREATE TABLE tweets (
    "user" character varying(20),
    tweet character varying(140),
    "time" timestamp without time zone DEFAULT now(),
    id integer DEFAULT nextval('tweets_id_seq'::regclass)
);


ALTER TABLE tweets OWNER TO piyush;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: piyush
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO piyush;

--
-- Name: users; Type: TABLE; Schema: public; Owner: piyush
--

CREATE TABLE users (
    first_name character varying(50),
    last_name character varying(50),
    email character varying(20),
    password character varying(20),
    id integer DEFAULT nextval('users_id_seq'::regclass),
    propic text
);


ALTER TABLE users OWNER TO piyush;

--
-- Data for Name: followers; Type: TABLE DATA; Schema: public; Owner: piyush
--

COPY followers (id, follower_id) FROM stdin;
\.


--
-- Data for Name: tweets; Type: TABLE DATA; Schema: public; Owner: piyush
--

COPY tweets ("user", tweet, "time", id) FROM stdin;
\.


--
-- Name: tweets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: piyush
--

SELECT pg_catalog.setval('tweets_id_seq', 1, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: piyush
--

COPY users (first_name, last_name, email, password, id, propic) FROM stdin;
Test	User	@c	c	1	\N
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: piyush
--

SELECT pg_catalog.setval('users_id_seq', 1, true);


--
-- PostgreSQL database dump complete
--

