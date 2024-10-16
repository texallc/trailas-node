export interface Length {
  msg: string;
  args: readonly [number, number];
}

export interface Max {
  msg: string;
  args: readonly [number];
}

export interface Min extends Max { }
