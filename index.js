/**
 * Host half of the Skill Catalog bundle.
 *
 * The catalog is read from remotes the deployment already mounts
 * (`session/list` and `skills/list`), so the Host row only makes the bundle a
 * normal, listable plugin entry; it provides no service and no config.
 */
export function apply() {}
