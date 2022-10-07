## RDF document editor (RDE)

*RDF Document Editor* (or *RDE*) is a web-based RDF editor based on [SHACL](??), buit using React and [Recoil](https://recoiljs.org/).

It was initially created by the [Buddhist Digital Resource Center](https://www.bdrc.io/) but with the ambition to become an independent open source software.

RDE is best suited for the edition of simple records like bibliography, persons, places, etc. The records should be limitted in size (\~100 triples) and not be recursive (like taxonomies). This limitation allows RDE to have a simple UI and API that can significantly lower the barrier to RDF adoption.

### Demo

A demo of RDE configured to use the BDRC API can be found at ???.

### Status

The code of RDE is work in progress but is production-ready, it is used by the BDRC. We welcome contributions!

Possible improvements include:
- UI forms for more literal types
- more constraints

### Concepts

RDE relies on high level concepts that makes the API and UI easier to understand by humans, but are not defined in RDF.

An **entity** is an RDF resource that has an associated document.

The **document** of an entity is an RDF graph that contains the triples related to this entity that will be edited by the user. A document must be a tree, and the root of the tree must be the entity. The tree can be up to 5 levels deep.

A **subnode** is an RDF resource that is a subject in the document but that is not the entity.

The **connex graph** of a document is an RDF graph containing the triples that are not part of the document but are helpful in the UI, typically labels. In the most common use case, if the document contains:

```ttl
ex:Person1 ex:hasBrother ex:Person2 .
```

the connex graph would contain:

```ttl
ex:Person2 skos:prefLabel "name of person 2"@en .
```

The **document shape graph** for an entity is an RDF graph containing the necessary triples to build the UI for the entire document of the entity. This includes:
- SHACL shapes for all subjects in the document (entity and subnodes)
- extensions to SHACL (DASH and RDE) when relevant

### API

The code relies on 5 configurable functions that need to be implemented when configuring RDE:

##### async getDocument(entity: RDFResource): RDFGraph

returns the document associated with an entity.

##### async getDocumentShapeGraph(entity: RDFResource): RDFGraph

returns the shape document for the document associated with an entity.

##### async getConnexGraph(entity: RDFResource): RDFGraph

return the connex graph for the document associated with an entity.

##### async putDocument(entity: RDFResource, document: RDFGraph): void

saves the document associated with an entity.

##### async selectFromSearch(query: string, query_lang: string, type: RDFResource): RDFResource, RDFGraph

this function must allow users to select a resource based on a text query. In the BDRC version, this opens an iframe to the results of the search on the website, with a mechanism to get the selection, but any other mechanism can work.

### Acknowledgement

We would like to thank the [The Robert H. N. Ho Family Foundation Global](https://www.rhfamilyfoundationglobal.org/) for funding the initial development of RDE.

We would like to thank Ashveen Bucktowar for his initial code and for suggesting the most excellent [Recoil](https://recoiljs.org/) library.

### License

The code is Copyright 2019-2021 Buddhist Digital Resource Center, and is provided under the MIT License.
