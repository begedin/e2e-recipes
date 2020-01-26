# Changelog

## v1.8.3 (2019-07-28)

### Bug fixes

  * [Plug.Builder] Ensure init_mode option is respected within the Plug.Builder DSL itself
  * [Plug.Session] Fix dropping session with custom max_age

## v1.8.2 (2019-06-01)

### Enhancements

  * [Plug.CSRFProtection] Increase entropy and ensure forwards compatibility with future URL-safe CSRF tokens

## v1.8.1 (2019-06-01)

### Enhancements

  * [Plug.CSRFProtection] Allow state to be dumped from the session and provide an API to validate both state and tokens
  * [Plug.Session.Store] Add `get/1` to retrieve the store from a module/atom
  * [Plug.Static] Support Nginx range requests
  * [Plug.Telemetry] Allow extra options in `Plug.Telemetry` metadata

## v1.8.0 (2019-03-31)

### Enhancements

  * [Plug.Conn] Add `get_session/1` for retrieving the whole session
  * [Plug.CSRFProtection] Add `Plug.CSRFPRotection.load_state/2` and `Plug.CSRFPRotection.dump_state/0` to allow tokens to be generated in other processes
  * [Plug.Parsers] Allow unnamed parts in multipart parser via `:include_unnamed_parts_at`
  * [Plug.Router] Wrap router dispatch in a connection checkpoint to avoid losing information attached to the connection in error cases
  * [Plug.Telemetry] Add `Plug.Telemetry` to facilitate with telemetry integration

### Bug fixes

  * [Plug.Conn.Status] Use IANA registered status code for HTTP 425
  * [Plug.RequestID] Reduce RequestID size by relying on base64 encoding
  * [Plug.Static] Ensure etags are quoted correctly
  * [Plug.Static] Ensure vary header is set in 304 response
  * [Plug.Static] Omit content-encoding header in 304 responses

## v1.7.2 (2019-02-09)

  * [Plug.Parser.MULTIPART] Support UTF-8 filename encoding in multipart parser
  * [Plug.Router] Add `builder_opts` support to `:dispatch` plug
  * [Plug.SSL] Do not disable client renegotiation
  * [Plug.Upload] Raise when we can't write to disk during upload

## v1.7.1 (2018-10-24)

  * [Plug.Adapters.Cowboy] Less verbose output when plug_cowboy is missing
  * [Plug.Adapters.Cowboy2] Less verbose output when plug_cowboy is missing

## v1.7.0 (2018-10-20)

### Enhancements

  * [Plug] Require Elixir v1.4+
  * [Plug.Session] Support MFAs for cookie session secrets
  * [Plug.Test] Add `put_peer_data`
  * [Plug.Adapters.Cowboy] Extract into [plug_cowboy][plug_cowboy]
  * [Plug.Adapters.Cowboy2] Extract into [plug_cowboy][plug_cowboy]

### Bug fixes

  * [Plug.SSL] Don't redirect excluded hosts on Plug.SSL

### Breaking Changes

  * [Plug] Applications may need to add `:plug_cowboy` to your deps to use this version

## v1.6

See [CHANGELOG in the v1.6 branch](https://github.com/elixir-plug/plug/blob/v1.6/CHANGELOG.md).

  [plug_cowboy]: https://github.com/elixir-plug/plug_cowboy
