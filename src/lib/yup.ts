import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { type Resolver } from 'react-hook-form';
import * as Yup from 'yup';
import { type ObjectShape } from 'yup';

export const yupFormResolver = yupResolver;

export function useYupSchema(schema: ObjectShape) {
  const YupSchema = useMemo(() => {
    return Yup.object().shape(schema);
  }, [schema]);

  return { Yup, schema: YupSchema };
}

export type YupResolverType<_ = any> = Resolver<any>;

export { Yup };
