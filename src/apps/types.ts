export type CRUD<
  Key,
  Create,
  Read,
  Update = Partial<Create>,
  Delete = Key,
> = {
  fun:
    | ["create", Create]
    | ["read", Read]
    | ["update", Update]
    | ["delete", Delete]
}
