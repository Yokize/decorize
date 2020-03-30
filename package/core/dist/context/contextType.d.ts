/**
 * Based on whether the context is original class (instance) or its
 * inheritors, the decorator determines how it should proceed with
 * decoration.
 */
export declare enum ContextType {
    Unknown = "Unknown",
    Original = "Original",
    Inheritor = "Inheritor"
}
