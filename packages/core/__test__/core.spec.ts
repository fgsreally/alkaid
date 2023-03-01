import { describe, expect, it } from 'vitest'
import { Factory, Inject } from '../dist'

describe('Factory', () => {
  class Son {
    name = 'son'
  }
  class Brother1 {
    constructor(public son: Son) {

    }
  }
  class Brother2 {
    constructor(public son: Son) {

    }
  }
  @Inject
  class Parent {
    constructor(public bro1: Brother1, public bro2: Brother2) {

    }
  }
  it('base use', () => {
    const { app } = Factory(Parent)
    expect(app.bro1.son.name).toBe('son')
    expect(app.bro2.son.name).toBe('son')
  })

  it('circular dep', () => {
    class Parent1 {
      constructor(public bro1: Brother1, public parent: Parent1) {

      }
    }
    expect(Factory(Parent1)).toThrowError()
  })
})
