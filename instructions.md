# Implementation Instructions

## Logic Implementation (Next Steps)
1. **Window Manager Store**: Create a Zustand store in `src/store/windowStore.ts` to handle:
   - Opening/Closing windows
   - Focusing windows (z-index)
   - Minimizing/Maximizing
   - Dragging state

2. **File System Simulation**: Create a file system structure format in `src/data/fileSystem.ts`.

3. **Terminal App**: Implement the AI Terminal using `src/components/apps/Terminal.tsx`.
   - Command parsing
   - Output history
   - Integration with "AI" (mocked or API)

4. **Integration**: Connect Dock icons to open respective apps via the store.

## Styling Note
- Ensure `globals.css` variable definitions match the desired macOS theme.
- Test "Dark Mode" compliance.
