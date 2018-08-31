/**
 * Created by bangbang93 on 2018/8/31.
 */
'use strict'
import {stdSerializers} from 'bunyan'
import * as omit from 'lodash.omit'

const OriginErrorSerializer = stdSerializers.err

const IgnoreFields = ['message', 'name', 'stack', 'code', 'signal']

interface IBunyanSerializerError {
  (err): any
  replaceOrigin?: () => void
}

const BunyanSerializerError: IBunyanSerializerError = (err) => {
  if (!err || !err.stack){
    return err
  }
  const obj = OriginErrorSerializer(err)
  return {
    ...obj,
    ...omit(err, IgnoreFields)
  }
}

BunyanSerializerError.replaceOrigin = () => {
  stdSerializers.err = BunyanSerializerError
}

export default BunyanSerializerError
