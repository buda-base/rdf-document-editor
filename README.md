## RDF document editor (RDE)

*RDF Document Editor* (or *RDE*) is a web-based RDF editor based on [SHACL](https://www.w3.org/TR/shacl/), buit using React and [Recoil](https://recoiljs.org/).

It was initially created by the [Buddhist Digital Resource Center](https://www.bdrc.io/) but with the ambition to become an independent open source software.

RDE is best suited for the edition of simple records like bibliography, persons, places, etc. The records should be limitted in size (\~100 triples) and not be recursive (like taxonomies). This limitation allows RDE to have a simple UI and API that can significantly lower the barrier to RDF adoption.

### Status

Initially BDRC produced its in-house [BLMP editor](https://github.com/buda-base/blmp-client/), which will be used in production mid-October 2022. We are in the process of extracting the code from the BLMP editor and, in the process, making it more generic.

We expect this operation to be fully complete at the end of October 2022.

### Demo

A read-only demo of the BLMP editor can be found at [https://rde-demo.bdrc.io/](https://rde-demo.bdrc.io/). It allows anyone to browse all the BDRC entities and shapes.

We expect a demo of RDE (isolated from the BDRC API) to be available at the end of October 2022.

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

The **document shapes graph** for an entity is an RDF graph containing the necessary triples to build the UI for the entire document of the entity. This includes:
- SHACL shapes for all subjects in the document (entity and subnodes)
- extensions to SHACL (DASH and RDE) when relevant
- relevant labels and descriptions for the properties and individuals

### API

The code relies on 5 configurable functions that need to be implemented when configuring RDE:

##### async getDocumentInfo(entity: RDFResource): RDFGraph[]

returns an array of RDF graphs containing:
- the document shapes graph
- the document
- the connex graph

##### async putDocument(entity: RDFResource, document: RDFGraph): void

saves the document associated with an entity.

##### async selectFromSearch(query: string, query_lang: string, type: RDFResource): RDFResource, RDFGraph

this function must allow users to select a resource based on a text query. In the BDRC version, this opens an iframe to the results of the search on the website, with a mechanism to get the selection, but any other mechanism can work.

### Acknowledgement

We would like to thank the [The Robert H. N. Ho Family Foundation Global](https://www.rhfamilyfoundationglobal.org/) for funding the initial development of RDE.

We would like to thank Ashveen Bucktowar for his initial code and for suggesting the most excellent [Recoil](https://recoiljs.org/) library.

### License

The code is Copyright 2019-2022 Buddhist Digital Resource Center, and is provided under the MIT License.
