# WarWebAssembly
Shared WebAssembly infrastructure for WarLike. WWA01 provides a minimal loader and executable fixture. Native compiler toolchains, memory management, isolation and app bindings are not yet implemented. Only load trusted modules; imports grant capabilities.

Run `npm test` with Node 22.

## WWA02 — Bounded linear memory and ABI
`createMemory` and `memoryABI` provide bounded little-endian i32/f32, byte and UTF-8 access, including after memory growth. No allocator or compiler yet.
