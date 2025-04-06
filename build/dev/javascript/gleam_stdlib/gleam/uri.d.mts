import type * as _ from "../gleam.d.mts";
import type * as $option from "../gleam/option.d.mts";
import type * as $string_tree from "../gleam/string_tree.d.mts";

export class Uri extends _.CustomType {
  constructor(
    scheme: $option.Option$<string>,
    userinfo: $option.Option$<string>,
    host: $option.Option$<string>,
    port: $option.Option$<number>,
    path: string,
    query: $option.Option$<string>,
    fragment: $option.Option$<string>
  );
  
  scheme: $option.Option$<string>;
  userinfo: $option.Option$<string>;
  host: $option.Option$<string>;
  port: $option.Option$<number>;
  path: string;
  query: $option.Option$<string>;
  fragment: $option.Option$<string>;
}

export type Uri$ = Uri;

export function parse_query(query: string): _.Result<
  _.List<[string, string]>,
  undefined
>;

export function percent_encode(value: string): string;

export function query_to_string(query: _.List<[string, string]>): string;

export function percent_decode(value: string): _.Result<string, undefined>;

export function path_segments(path: string): _.List<string>;

export function to_string(uri: Uri$): string;

export function origin(uri: Uri$): _.Result<string, undefined>;

export function merge(base: Uri$, relative: Uri$): _.Result<Uri$, undefined>;

export const empty: Uri$;

export function parse(uri_string: string): _.Result<Uri$, undefined>;
