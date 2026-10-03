/**
 * Filters a list of commands based on category, type, search term, and favorites.
 *
 * @param {Array} commands - Full list of command objects
 * @param {Object} options - Filtering options
 * @param {string} options.category - Selected category ('All' or specific category)
 * @param {string} options.type - Selected type ('all' or specific command type)
 * @param {string} options.searchQuery - Raw search string
 * @param {boolean} options.onlyFavorites - Show only favorites flag
 * @param {Array<string>} options.favorites - Array of favorited command IDs
 * @returns {Array} Filtered commands
 */
export function filterCommands(commands, { category = 'All', type = 'all', searchQuery = '', onlyFavorites = false, favorites = [] }) {
  if (!Array.isArray(commands)) return [];

  const query = searchQuery.trim().toLowerCase();

  return commands.filter((cmd) => {
    // 1. Favorites check
    if (onlyFavorites && !favorites.includes(cmd.id)) {
      return false;
    }

    // 2. Category check
    if (category && category !== 'All' && cmd.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }

    // 3. Type check
    if (type && type !== 'all' && cmd.type?.toLowerCase() !== type.toLowerCase()) {
      return false;
    }

    // 4. Search query check
    if (!query) {
      return true;
    }

    // Match across: name, package name, description, category, technology, tags, commands
    const matchesName = cmd.name?.toLowerCase().includes(query);
    const matchesDesc = cmd.description?.toLowerCase().includes(query);
    const matchesCategory = cmd.category?.toLowerCase().includes(query);
    const matchesTech = cmd.technology?.toLowerCase().includes(query);
    const matchesTags = Array.isArray(cmd.tags) && cmd.tags.some((tag) => tag.toLowerCase().includes(query));
    const matchesCommands = Array.isArray(cmd.commands) && cmd.commands.some((c) => c.toLowerCase().includes(query));
    const matchesId = cmd.id?.toLowerCase().includes(query);

    return matchesName || matchesDesc || matchesCategory || matchesTech || matchesTags || matchesCommands || matchesId;
  });
}
