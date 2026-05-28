export const DATA = {
  curriculum: [
    {
      id: "rag",
      track: "RAG Mastery",
      goal: "Optimize enterprise data ingestion pipelines and transition from basic vector search to deterministic, hybrid retrieval networks.",
      accent: "rgba(243,201,105,0.15)",
      masteryQuestions: [
        "Was the failure caused by ingestion, retrieval, context packing, or generation?",
        "Which chunking strategy should be used for this document shape and why?",
        "How do we measure context recall, citation correctness, and refusal correctness?",
        "How do we handle access-controlled, conflicting, stale, or duplicated documents?",
        "How do we reduce latency and cost without silently reducing answer quality?"
      ],
      topics: [
        {
          id: "rag-ingestion",
          level: "L1 - Corpus trust",
          title: "Document ingestion and knowledge-base quality",
          why: "Enterprise RAG usually fails before retrieval: bad parsing, lost tables, stale documents, broken metadata, duplicate docs, and permission leaks.",
          deliverable: "Build an ingestion audit notebook that reports parse quality, table loss, duplicates, metadata coverage, ACL coverage, and document freshness.",
          checkpoints: [
            "Compare parsing output for normal PDFs, scanned PDFs, tables, slides, and web pages.",
            "Create a metadata contract: source, owner, version, created_at, updated_at, ACL, section path, document type.",
            "Implement deduplication using exact hashes plus near-duplicate similarity.",
            "Create an ingestion quality score for each document.",
            "Simulate an ACL failure and prove the retriever cannot leak restricted chunks."
          ],
          questions: ["Can I trust the knowledge base?", "What information disappeared during parsing?", "Can metadata filters be trusted?"],
          resources: [
            { type: "paper", title: "LayoutLMv3: Pre-training for Document AI with Unified Text and Image Masking", url: "https://arxiv.org/abs/2204.08387", why: "Useful for understanding document AI beyond plain text extraction.", availability: "Free paper" },
            { type: "book", title: "Introduction to Information Retrieval - Manning, Raghavan, Schutze", url: "https://nlp.stanford.edu/IR-book/pdf/irbookonlinereading.pdf", why: "The classical foundation for indexing, tokenization, evaluation, and retrieval thinking.", availability: "Official PDF" },
            { type: "repo", title: "Unstructured", url: "https://github.com/Unstructured-IO/unstructured", why: "Practical document ingestion library for varied enterprise document formats.", availability: "Open-source repo" },
            { type: "repo", title: "Docling", url: "https://github.com/docling-project/docling", why: "Document conversion toolkit with strong relevance for PDFs and complex document layouts.", availability: "Open-source repo" },
            { type: "repo", title: "Camelot", url: "https://github.com/camelot-dev/camelot", why: "Focused table extraction from PDFs; useful when policy or finance documents contain tabular knowledge.", availability: "Open-source repo" },
            { type: "docs", title: "LlamaIndex loading and ingestion docs", url: "https://docs.llamaindex.ai/en/stable/module_guides/loading/", why: "Good practical patterns for ingestion pipelines and document readers.", availability: "Official docs" },
            { type: "docs", title: "Databricks Unity Catalog documentation", url: "https://docs.databricks.com/aws/en/data-governance/unity-catalog/", why: "Grounding for governed data, permissions, lineage, and access boundaries in your work stack.", availability: "Official docs" }
          ]
        },
        {
          id: "rag-chunking",
          level: "L2 - Chunking lab",
          title: "Chunking strategies and context design",
          why: "Chunking is an information architecture decision. The right strategy depends on document structure, question type, and evaluation metrics.",
          deliverable: "Create a chunking benchmark comparing fixed, recursive, semantic, section-aware, parent-child, sliding-window, and contextual chunks.",
          checkpoints: [
            "Implement fixed-size and recursive chunking baselines.",
            "Implement section-aware chunking using headings and page/section metadata.",
            "Implement parent-child retrieval and compare against flat chunks.",
            "Measure context recall and context precision across chunking strategies.",
            "Write failure examples where each chunking strategy breaks."
          ],
          questions: ["Does the chunk preserve enough local meaning?", "Does it preserve hierarchy?", "Does chunk size hurt recall, precision, or cost?"],
          resources: [
            { type: "paper", title: "Lost in the Middle: How Language Models Use Long Contexts", url: "https://arxiv.org/abs/2307.03172", why: "Explains why blindly stuffing long contexts can fail even with long-context models.", availability: "Free paper" },
            { type: "paper", title: "RAPTOR: Recursive Abstractive Processing for Tree-Organized Retrieval", url: "https://arxiv.org/abs/2401.18059", why: "A strong paper for hierarchical retrieval and summarized tree structures.", availability: "Free paper" },
            { type: "book", title: "AI Engineering - Chip Huyen", url: "https://huyenchip.com/books/", why: "Modern foundation-model application design, including context, evaluation, and deployment thinking.", availability: "Official page; no verified legal PDF" },
            { type: "docs", title: "LangChain text splitters", url: "https://docs.langchain.com/oss/python/integrations/splitters", why: "Practical implementation reference for multiple splitter families.", availability: "Official docs" },
            { type: "docs", title: "LlamaIndex node parsers", url: "https://docs.llamaindex.ai/en/stable/module_guides/loading/node_parsers/", why: "Useful for hierarchical and semantic node construction.", availability: "Official docs" },
            { type: "article", title: "Anthropic: Contextual Retrieval", url: "https://www.anthropic.com/news/contextual-retrieval", why: "Practical technique for adding contextual descriptions to chunks before embedding.", availability: "Article" }
          ]
        },
        {
          id: "rag-retrieval",
          level: "L3 - Retrieval mechanics",
          title: "Dense, sparse, hybrid, query rewriting, and HyDE retrieval",
          why: "Most bad RAG answers are retrieval failures. You need to know BM25, dense retrieval, hybrid scoring, top-k tuning, query rewriting, and when retrieval confidence is too low.",
          deliverable: "Build a retrieval lab that can run BM25, dense, hybrid, multi-query, query rewriting, HyDE, and metadata filtering over the same corpus.",
          checkpoints: [
            "Implement BM25 and dense retrieval baselines.",
            "Add hybrid retrieval and tune sparse/dense weights.",
            "Add query rewriting and multi-query expansion.",
            "Add HyDE and compare against normal query embedding.",
            "Measure top-k sensitivity, recall@k, MRR, nDCG, latency, and cost."
          ],
          questions: ["Did we retrieve the right evidence?", "Is top-k too small or too noisy?", "Do metadata filters improve precision or hide relevant evidence?"],
          resources: [
            { type: "paper", title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", url: "https://arxiv.org/abs/2005.11401", why: "The canonical RAG paper; start here to understand parametric plus non-parametric memory.", availability: "Free paper" },
            { type: "paper", title: "Dense Passage Retrieval for Open-Domain Question Answering", url: "https://arxiv.org/abs/2004.04906", why: "Core paper for dense dual-encoder retrieval.", availability: "Free paper" },
            { type: "paper", title: "Precise Zero-Shot Dense Retrieval without Relevance Labels - HyDE", url: "https://arxiv.org/abs/2212.10496", why: "Important query transformation idea for retrieval without labeled data.", availability: "Free paper" },
            { type: "book", title: "Introduction to Information Retrieval", url: "https://nlp.stanford.edu/IR-book/pdf/irbookonlinereading.pdf", why: "Read BM25, inverted indexes, vector space models, and evaluation chapters.", availability: "Official PDF" },
            { type: "repo", title: "FAISS", url: "https://github.com/facebookresearch/faiss", why: "Canonical vector similarity search library.", availability: "Open-source repo" },
            { type: "repo", title: "Pyserini", url: "https://github.com/castorini/pyserini", why: "Strong toolkit for reproducible sparse/dense/hybrid retrieval experiments.", availability: "Open-source repo" },
            { type: "docs", title: "Databricks Vector Search", url: "https://learn.microsoft.com/en-us/azure/databricks/vector-search/query-vector-search", why: "Relevant to your stack; includes filters and reranking concepts.", availability: "Official docs" }
          ]
        },
        {
          id: "rag-reranking",
          level: "L4 - Reranking and late interaction",
          title: "Reranking, cross-encoders, and late-interaction retrieval",
          why: "The first retriever should maximize recall; rerankers improve precision before context hits the LLM. This is a major production quality lever.",
          deliverable: "Compare no-reranker, cross-encoder reranker, ColBERT-style late interaction, and provider rerank APIs on the same golden queries.",
          checkpoints: [
            "Add a cross-encoder reranker after hybrid retrieval.",
            "Tune candidate pool size versus final context size.",
            "Measure reranking latency and quality lift.",
            "Identify query classes where reranking hurts.",
            "Create a cost-quality decision table for reranking."
          ],
          questions: ["Should retrieval optimize recall while reranking optimizes precision?", "How much latency is reranking worth?", "Which query classes need reranking?"],
          resources: [
            { type: "paper", title: "ColBERT: Efficient and Effective Passage Search via Contextualized Late Interaction over BERT", url: "https://arxiv.org/abs/2004.12832", why: "Canonical late-interaction retrieval paper.", availability: "Free paper" },
            { type: "paper", title: "ColBERTv2: Efficient and Effective Retrieval via Lightweight Late Interaction", url: "https://arxiv.org/abs/2112.01488", why: "Improved ColBERT architecture and compression.", availability: "Free paper" },
            { type: "repo", title: "Stanford FutureData ColBERT", url: "https://github.com/stanford-futuredata/ColBERT", why: "Official implementation and a strong practical reference.", availability: "Open-source repo" },
            { type: "repo", title: "FlagEmbedding", url: "https://github.com/FlagOpen/FlagEmbedding", why: "BGE embeddings and reranker models widely used in applied RAG.", availability: "Open-source repo" },
            { type: "docs", title: "SentenceTransformers Cross-Encoder docs", url: "https://www.sbert.net/examples/cross_encoder/applications/README.html", why: "Practical guide to cross-encoder reranking.", availability: "Official docs" },
            { type: "docs", title: "Cohere Rerank docs", url: "https://docs.cohere.com/docs/reranking", why: "Provider-backed reranking reference for applied systems.", availability: "Official docs" }
          ]
        },
        {
          id: "rag-generation-grounding",
          level: "L5 - Grounded generation",
          title: "Answer synthesis, citations, refusal, and conflict handling",
          why: "Production RAG must not merely answer. It must answer with evidence, cite correctly, handle uncertainty, and refuse when the corpus is insufficient.",
          deliverable: "Build generation prompts and validators for grounded answers, exact citations, conflict detection, quote support, and refusal behavior.",
          checkpoints: [
            "Force answer generation to cite specific chunks or sections.",
            "Add refusal logic for low-retrieval-confidence and missing-context cases.",
            "Add conflict handling when documents disagree.",
            "Add structured answer output with answer, evidence, confidence, missing_info, and citations.",
            "Write negative tests where the correct behavior is refusing."
          ],
          questions: ["Did the answer use only retrieved evidence?", "Were citations actually supporting the claims?", "Did the model refuse when it should?"],
          resources: [
            { type: "paper", title: "Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection", url: "https://arxiv.org/abs/2310.11511", why: "Important idea for retrieval/generation self-critique and adaptive retrieval.", availability: "Free paper" },
            { type: "paper", title: "Corrective Retrieval Augmented Generation", url: "https://arxiv.org/abs/2401.15884", why: "Targets robustness when retrieval is wrong or ambiguous.", availability: "Free paper" },
            { type: "paper", title: "RARR: Researching and Revising What Language Models Say", url: "https://arxiv.org/abs/2210.08726", why: "Good reference for attribution and revision workflows.", availability: "Free paper" },
            { type: "book", title: "AI Engineering - Chip Huyen", url: "https://huyenchip.com/books/", why: "Modern AI app reliability, evaluation, and deployment framework.", availability: "Official page; no verified legal PDF" },
            { type: "docs", title: "OpenAI Structured Outputs", url: "https://platform.openai.com/docs/guides/structured-outputs", why: "Useful for typed outputs such as answer/evidence/confidence/citations.", availability: "Official docs" },
            { type: "docs", title: "LangChain RAG tutorials", url: "https://python.langchain.com/docs/tutorials/rag/", why: "Practical implementation patterns for grounded RAG workflows.", availability: "Official docs" }
          ]
        },
        {
          id: "rag-evaluation",
          level: "L6 - RAG evaluation",
          title: "RAG evaluation: retrieval, generation, citations, refusals",
          why: "Mastery starts when every RAG change is measured. Evaluation is the bridge from demo to production engineering.",
          deliverable: "Create a RAG eval harness with golden questions, expected docs, expected refusal, retrieved chunks, answer scores, citation scores, and regression reports.",
          checkpoints: [
            "Create 50-100 questions: answerable, unanswerable, ambiguous, multi-doc, citation-heavy.",
            "Measure context recall, context precision, MRR, nDCG, and top-k accuracy.",
            "Measure faithfulness, answer relevance, citation correctness, refusal correctness.",
            "Add human review for a small calibrated set.",
            "Create a before/after report for every retrieval or prompt change."
          ],
          questions: ["Did retrieval find the evidence?", "Did generation stay faithful?", "Did the system outcome improve?"],
          resources: [
            { type: "paper", title: "RAGAS: Automated Evaluation of Retrieval Augmented Generation", url: "https://arxiv.org/abs/2309.15217", why: "Reference-free RAG evaluation framework covering retrieval and generation dimensions.", availability: "Free paper" },
            { type: "paper", title: "ARES: An Automated Evaluation Framework for RAG Systems", url: "https://arxiv.org/abs/2311.09476", why: "Strong approach using synthetic data, judges, and prediction-powered inference.", availability: "Free paper" },
            { type: "repo", title: "Ragas", url: "https://github.com/explodinggradients/ragas", why: "Practical open-source framework for RAG and LLM app evaluation.", availability: "Open-source repo" },
            { type: "repo", title: "ARES", url: "https://github.com/stanford-futuredata/ARES", why: "Open-source implementation for automated RAG evaluation.", availability: "Open-source repo" },
            { type: "repo", title: "TruLens", url: "https://github.com/truera/trulens", why: "Instrumentation and evaluation for RAG and agentic applications.", availability: "Open-source repo" },
            { type: "repo", title: "DeepEval", url: "https://github.com/confident-ai/deepeval", why: "LLM evaluation framework with test-style developer workflow.", availability: "Open-source repo" },
            { type: "docs", title: "MLflow GenAI evaluation quickstart", url: "https://mlflow.org/docs/latest/genai/eval-monitor/quickstart/", why: "Relevant production evaluation workflow for LLM apps and agents.", availability: "Official docs" },
            { type: "docs", title: "Databricks evaluate and monitor AI agents", url: "https://docs.databricks.com/aws/en/mlflow3/genai/eval-monitor/", why: "Directly relevant to Databricks-native agent/RAG evaluation.", availability: "Official docs" }
          ]
        },
        {
          id: "rag-databricks-production",
          level: "L7 - Production RAG on Databricks",
          title: "Databricks-native production RAG",
          why: "Your unfair advantage is connecting RAG quality to Unity Catalog, MLflow, Vector Search, workflows, permissions, and production traces.",
          deliverable: "Deploy a Databricks-style enterprise RAG with governed tables, Vector Search, MLflow tracing, feedback Delta tables, eval jobs, and release gates.",
          checkpoints: [
            "Store documents and chunks in Delta tables governed by Unity Catalog.",
            "Create Vector Search indexes with metadata filters.",
            "Log traces with MLflow for retrieval, prompts, tool calls, and final answer.",
            "Store feedback and eval outputs in Delta tables.",
            "Create a release gate: do not promote if eval score drops or latency/cost exceeds threshold."
          ],
          questions: ["Can this be governed?", "Can it be traced?", "Can it be evaluated before release?", "Can it be monitored after release?"],
          resources: [
            { type: "paper", title: "Hidden Technical Debt in Machine Learning Systems", url: "https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems", why: "Systems mindset for avoiding glue code, pipeline jungles, and undeclared consumers.", availability: "Free paper" },
            { type: "book", title: "Designing Machine Learning Systems - Chip Huyen", url: "https://huyenchip.com/books/", why: "Holistic production ML systems thinking.", availability: "Official page; no verified legal PDF" },
            { type: "docs", title: "Databricks Mosaic AI Agent Framework", url: "https://docs.databricks.com/aws/en/generative-ai/agent-framework/", why: "Databricks-native agent/RAG build-deploy-evaluate path.", availability: "Official docs" },
            { type: "docs", title: "Databricks Vector Search", url: "https://docs.databricks.com/aws/en/generative-ai/vector-search", why: "Core retrieval infrastructure for Databricks RAG.", availability: "Official docs" },
            { type: "docs", title: "MLflow Tracing - GenAI observability", url: "https://docs.databricks.com/aws/en/mlflow3/genai/tracing/", why: "End-to-end traces for RAG and agent systems.", availability: "Official docs" },
            { type: "docs", title: "Databricks Asset Bundles", url: "https://docs.databricks.com/aws/en/dev-tools/bundles/", why: "Production packaging and deployment of Databricks assets.", availability: "Official docs" }
          ]
        }
      ]
    },
    {
      id: "agents",
      track: "Agentic System Design",
      goal: "Architecture durable, stateful automation workflows using explicit control loops, custom tool validation schemas, and human-in-the-loop gates.",
      accent: "rgba(125,230,209,0.15)",
      masteryQuestions: [
        "Should this be an agent, a workflow, a search system, or a normal API?",
        "What state must be persisted, inspected, resumed, or rolled back?",
        "Which tools are read-only, write-capable, risky, idempotent, or approval-gated?",
        "How do we prevent loops, hallucinated tool results, and unauthorized actions?",
        "How do we evaluate tool choice, tool arguments, and task completion?"
      ],
      topics: [
        {
          id: "agent-systems-mindset",
          level: "A1 - Agent vs workflow",
          title: "Agent systems mindset: when to use agents",
          why: "A production agent is a control system, not a chatbot. Start by learning when agents are useful and when deterministic workflows are better.",
          deliverable: "Write an agent decision rubric: agent vs workflow vs RAG vs normal API for 10 enterprise use cases.",
          checkpoints: [
            "Define agent, workflow, chain, router, planner, and tool-calling assistant precisely.",
            "List failure modes introduced by autonomy.",
            "Create decision criteria: uncertainty, tool diversity, task length, risk, reversibility, evalability.",
            "Design a workflow-first version and an agentic version of the same use case.",
            "Write when not to use an agent."
          ],
          questions: ["What uncertainty requires agentic behavior?", "Can this be deterministic?", "Can failures be bounded?"],
          resources: [
            { type: "paper", title: "MRKL Systems", url: "https://arxiv.org/abs/2205.00445", why: "Early systems framing for LLMs plus external tools and symbolic modules.", availability: "Free paper" },
            { type: "paper", title: "ReAct: Synergizing Reasoning and Acting in Language Models", url: "https://arxiv.org/abs/2210.03629", why: "Canonical pattern for interleaving reasoning and actions.", availability: "Free paper" },
            { type: "book", title: "AI Engineering - Chip Huyen", url: "https://huyenchip.com/books/", why: "Strong modern framing for building applications with foundation models.", availability: "Official page; no verified legal PDF" },
            { type: "article", title: "Lilian Weng: LLM Powered Autonomous Agents", url: "https://lilianweng.github.io/posts/2023-06-23-agent/", why: "Clear conceptual Dashboard of agent components and patterns.", availability: "Article" },
            { type: "docs", title: "Databricks agent system design patterns", url: "https://docs.databricks.com/aws/en/generative-ai/agent-framework/agent-system-design-patterns", why: "Good enterprise-oriented framing close to your stack.", availability: "Official docs" }
          ]
        },
        {
          id: "agent-state-memory",
          level: "A2 - State and memory",
          title: "Agent state, memory, persistence, and recovery",
          why: "Reliable agents need explicit state, durable execution, checkpointing, and resumability. Otherwise every failure becomes invisible and unrecoverable.",
          deliverable: "Build a LangGraph workflow with persistent state, checkpointing, retry state, and human-editable intermediate state.",
          checkpoints: [
            "Separate task state, conversation state, tool state, and long-term memory.",
            "Add checkpointing and resume after artificial failure.",
            "Store tool outputs as facts, not as hidden natural-language assumptions.",
            "Add a state inspection UI or trace view.",
            "Document what should never be stored in memory."
          ],
          questions: ["If the agent fails halfway, can it resume safely?", "What state is durable?", "What state is user-editable?"],
          resources: [
            { type: "paper", title: "Reflexion: Language Agents with Verbal Reinforcement Learning", url: "https://arxiv.org/abs/2303.11366", why: "Important memory/reflection pattern for learning from prior attempts without weight updates.", availability: "Free paper" },
            { type: "paper", title: "Generative Agents: Interactive Simulacra of Human Behavior", url: "https://arxiv.org/abs/2304.03442", why: "Classic reference for memory streams, reflection, and planning in agents.", availability: "Free paper" },
            { type: "repo", title: "LangGraph", url: "https://github.com/langchain-ai/langgraph", why: "Core framework for stateful, durable, inspectable agent workflows.", availability: "Open-source repo" },
            { type: "docs", title: "LangGraph Dashboard", url: "https://www.langchain.com/langgraph", why: "Official Dashboard of state, memory, human-in-the-loop, and durable execution.", availability: "Official docs" },
            { type: "docs", title: "LangGraph persistence docs", url: "https://langchain-ai.github.io/langgraph/concepts/persistence/", why: "Key concept for checkpointing and durable agent state.", availability: "Official docs" }
          ]
        },
        {
          id: "agent-tool-design",
          level: "A3 - Tool design",
          title: "Tool schemas, permissions, idempotency, and error handling",
          why: "Bad tool design is a top reason agents fail. Production tools need schemas, validation, safe defaults, retries, timeouts, audit logs, and permission boundaries.",
          deliverable: "Design a tool registry for an MLOps copilot with read/write tags, risk labels, dry-run mode, argument validators, and audit logs.",
          checkpoints: [
            "Classify tools as read-only, write-capable, destructive, external, privileged, and approval-required.",
            "Make tools idempotent where possible; add request IDs and dry-run modes.",
            "Validate tool arguments before execution.",
            "Add retries, timeout handling, and clear error surfaces.",
            "Log every tool call with inputs, outputs, caller, risk label, and approval status."
          ],
          questions: ["Can this tool cause damage?", "Can it be retried safely?", "What should the model not decide by itself?"],
          resources: [
            { type: "paper", title: "Toolformer", url: "https://arxiv.org/abs/2302.04761", why: "Core paper on models learning when and how to use tools.", availability: "Free paper" },
            { type: "paper", title: "Gorilla: Large Language Model Connected with Massive APIs", url: "https://arxiv.org/abs/2305.15334", why: "API selection, argument correctness, and reduced hallucinated tool usage.", availability: "Free paper" },
            { type: "repo", title: "Gorilla", url: "https://github.com/ShishirPatil/gorilla", why: "Official repo for API-calling research and evaluation assets.", availability: "Open-source repo" },
            { type: "docs", title: "OpenAI function calling", url: "https://platform.openai.com/docs/guides/function-calling", why: "Practical tool-calling schema reference.", availability: "Official docs" },
            { type: "docs", title: "Anthropic tool use", url: "https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/Dashboard", why: "Good reference for tool design and tool-use behavior.", availability: "Official docs" },
            { type: "docs", title: "Model Context Protocol", url: "https://modelcontextprotocol.io/docs/getting-started/intro", why: "Emerging standard for connecting agents to tools and context providers.", availability: "Official docs" }
          ]
        },
        {
          id: "agent-control-flow",
          level: "A4 - Control flow patterns",
          title: "Routers, planners, ReAct, reflection, critics, and state machines",
          why: "Agent reliability comes from explicit control flow. Use graphs and state machines when the enterprise flow needs guarantees.",
          deliverable: "Build a controlled agent workflow with router, retrieval node, tool node, critic node, approval node, and final answer node.",
          checkpoints: [
            "Implement router pattern for query classification.",
            "Implement planner-executor for multi-step work.",
            "Implement ReAct-style tool use with trace visibility.",
            "Add critic/reviewer node for risky outputs.",
            "Replace free-form loops with bounded graph transitions."
          ],
          questions: ["Where should the flow be deterministic?", "Where should the LLM decide?", "How do we bound loops and retries?"],
          resources: [
            { type: "paper", title: "ReAct", url: "https://arxiv.org/abs/2210.03629", why: "Reasoning plus action pattern for tool-using agents.", availability: "Free paper" },
            { type: "paper", title: "Tree of Thoughts", url: "https://arxiv.org/abs/2305.10601", why: "Search and backtracking over candidate reasoning paths.", availability: "Free paper" },
            { type: "paper", title: "Language Agent Tree Search", url: "https://arxiv.org/abs/2310.04406", why: "Combines planning/search with language agents.", availability: "Free paper" },
            { type: "repo", title: "Tree of Thoughts official repo", url: "https://github.com/princeton-nlp/tree-of-thought-llm", why: "Official code and prompts for ToT.", availability: "Open-source repo" },
            { type: "docs", title: "LangGraph concepts", url: "https://langchain-ai.github.io/langgraph/concepts/", why: "Use graph nodes and edges to make agent flow explicit.", availability: "Official docs" },
            { type: "tutorial", title: "LangChain Academy: Introduction to LangGraph", url: "https://academy.langchain.com/courses/intro-to-langgraph", why: "Structured hands-on learning for stateful agent workflows.", availability: "Tutorial" }
          ]
        },
        {
          id: "agent-human-loop",
          level: "A5 - Human approval",
          title: "Human-in-the-loop and approval-gated execution",
          why: "Enterprise agents must support inspection, interruption, approval, rejection, and edited state before risky actions.",
          deliverable: "Add human approval gates before write actions in your MLOps copilot: approve, edit arguments, reject, or request more evidence.",
          checkpoints: [
            "Define approval policy by risk level and tool type.",
            "Pause execution before risky tools.",
            "Let reviewer edit tool arguments and agent state.",
            "Resume from checkpoint after approval.",
            "Log approval decision, reviewer, timestamp, and rationale."
          ],
          questions: ["What actions need approval?", "Can a human edit the plan?", "Can the system prove what was approved?"],
          resources: [
            { type: "paper", title: "The ML Test Score", url: "https://research.google/pubs/the-ml-test-score-a-rubric-for-ml-production-readiness-and-technical-debt-reduction/", why: "Production readiness mindset for tests and monitoring; applies well to AI approval gates.", availability: "Free paper" },
            { type: "docs", title: "LangChain human-in-the-loop middleware", url: "https://docs.langchain.com/oss/python/langchain/human-in-the-loop", why: "Practical approval/interruption patterns for agent tools.", availability: "Official docs" },
            { type: "docs", title: "LangGraph human-in-the-loop concepts", url: "https://langchain-ai.github.io/langgraph/concepts/human_in_the_loop/", why: "Core reference for interrupt/resume and human state edits.", availability: "Official docs" },
            { type: "docs", title: "Databricks build agents", url: "https://learn.microsoft.com/en-us/azure/databricks/generative-ai/agent-framework/build-agents", why: "Enterprise agent lifecycle reference in Databricks.", availability: "Official docs" }
          ]
        },
        {
          id: "agent-security",
          level: "A6 - Security and governance",
          title: "Prompt injection, tool permissions, data access, and policy boundaries",
          why: "Tool-using agents expand the blast radius of prompt injection and over-permissive service accounts. Security has to be part of design, not an afterthought.",
          deliverable: "Create an agent threat model covering indirect prompt injection, data exfiltration, unsafe tool calls, secrets, ACL leakage, and over-broad cloud IAM.",
          checkpoints: [
            "Classify all external text as untrusted input.",
            "Separate model instructions from retrieved content.",
            "Add allowlisted tools and policy checks before execution.",
            "Test prompt injection attempts inside retrieved documents.",
            "Use least-privilege service accounts and secret handling."
          ],
          questions: ["Can retrieved text control tools?", "Can the agent leak secrets?", "Are permissions scoped to task needs?"],
          resources: [
            { type: "paper", title: "Not What You've Signed Up For: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection", url: "https://arxiv.org/abs/2302.12173", why: "Foundational paper for indirect prompt injection risk.", availability: "Free paper" },
            { type: "paper", title: "Prompt Injection attack against LLM-integrated Applications", url: "https://arxiv.org/abs/2306.05499", why: "Threat modeling and attack patterns for integrated apps.", availability: "Free paper" },
            { type: "docs", title: "OWASP Top 10 for LLM Applications", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/", why: "Practical security categories for LLM systems.", availability: "Official docs" },
            { type: "docs", title: "Google Cloud IAM Dashboard", url: "https://cloud.google.com/iam/docs/Dashboard", why: "Least-privilege foundation for GCP-based AI services.", availability: "Official docs" },
            { type: "docs", title: "Databricks Unity Catalog privileges", url: "https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-privileges/", why: "Access-control grounding for Databricks documents, tables, and models.", availability: "Official docs" }
          ]
        },
        {
          id: "agent-multi-agent",
          level: "A7 - Multi-agent systems",
          title: "Supervisor-worker and multi-agent patterns",
          why: "Multi-agent systems are useful after single-agent reliability. Use them for specialization, review, simulation, or separation of responsibilities - not for hype.",
          deliverable: "Build a supervisor-worker workflow where one agent plans, one retrieves evidence, one checks tool results, and one reviews final output.",
          checkpoints: [
            "Define why multiple agents are needed instead of multiple nodes.",
            "Give each agent a narrow role and bounded authority.",
            "Use shared state and explicit handoff schemas.",
            "Add critic/reviewer behavior as a separate step.",
            "Evaluate whether multi-agent improves quality enough to justify cost and complexity."
          ],
          questions: ["Is this multi-agent or just multi-step?", "What does each agent own?", "Does quality improve or just cost?"],
          resources: [
            { type: "paper", title: "AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation", url: "https://arxiv.org/abs/2308.08155", why: "Canonical multi-agent conversation framework paper.", availability: "Free paper" },
            { type: "paper", title: "CAMEL: Communicative Agents for Mind Exploration", url: "https://arxiv.org/abs/2303.17760", why: "Early role-playing multi-agent coordination paper.", availability: "Free paper" },
            { type: "repo", title: "Microsoft AutoGen", url: "https://github.com/microsoft/autogen", why: "Major open-source framework for multi-agent experimentation.", availability: "Open-source repo" },
            { type: "repo", title: "CrewAI", url: "https://github.com/crewAIInc/crewAI", why: "Practical multi-agent orchestration framework.", availability: "Open-source repo" },
            { type: "repo", title: "Semantic Kernel", url: "https://github.com/microsoft/semantic-kernel", why: "Enterprise-oriented agent/plugin orchestration framework.", availability: "Open-source repo" },
            { type: "docs", title: "LangGraph multi-agent docs", url: "https://langchain-ai.github.io/langgraph/concepts/multi_agent/", why: "Graph-based multi-agent design patterns.", availability: "Official docs" }
          ]
        }
      ]
    },
    {
      id: "eval",
      track: "Evaluation Mastery",
      goal: "Build automated QA pipelines to systematically benchmark context precision, response grounding, and citation accuracy.",
      accent: "rgba(168,146,255,0.15)",
      masteryQuestions: [
        "What does task success mean for this AI system?",
        "What should be evaluated automatically and what needs human calibration?",
        "Which failures are retrieval failures, generation failures, tool failures, or policy failures?",
        "Can we catch regressions before model/prompt/tool changes go live?",
        "Can evaluation be connected to traces, feedback, and release gates?"
      ],
      topics: [
        {
          id: "eval-dataset",
          level: "E1 - Golden datasets",
          title: "Golden dataset and test-case design",
          why: "Evaluation starts with good test cases. Your dataset should represent real user tasks, edge cases, negative cases, and enterprise risk.",
          deliverable: "Create a versioned golden dataset schema with question, task type, expected docs, expected answer, expected tool calls, refusal flag, risk tag, and difficulty tag.",
          checkpoints: [
            "Create query categories: fact lookup, comparison, multi-hop, procedural, ambiguous, unanswerable, risky action.",
            "Tag each item with source docs, owner, difficulty, expected behavior, and failure mode.",
            "Add human-reviewed examples for calibration.",
            "Version datasets and store changes like code.",
            "Add synthetic examples only after grounding categories in real use cases."
          ],
          questions: ["Does the dataset represent actual product risk?", "Are negative cases included?", "Is there a small human-calibrated set?"],
          resources: [
            { type: "paper", title: "Datasheets for Datasets", url: "https://arxiv.org/abs/1803.09010", why: "Useful discipline for documenting datasets and intended uses.", availability: "Free paper" },
            { type: "paper", title: "HELM: Holistic Evaluation of Language Models", url: "https://arxiv.org/abs/2211.09110", why: "Broad evaluation taxonomy and scenarios for language models.", availability: "Free paper" },
            { type: "book", title: "AI Engineering - Chip Huyen", url: "https://huyenchip.com/books/", why: "Strong coverage of evals for foundation-model applications.", availability: "Official page; no verified legal PDF" },
            { type: "docs", title: "OpenAI Evals", url: "https://developers.openai.com/learn/evals", why: "Practical guidance for building and running evals.", availability: "Official docs" },
            { type: "docs", title: "MLflow GenAI evaluation", url: "https://mlflow.org/docs/latest/genai/eval-monitor/", why: "Evaluation flow that connects to experiments, traces, and monitoring.", availability: "Official docs" }
          ]
        },
        {
          id: "eval-retrieval-metrics",
          level: "E2 - Retrieval metrics",
          title: "Retrieval metrics and failure analysis",
          why: "You cannot fix RAG by staring at final answers. Retrieval must be scored independently.",
          deliverable: "Build a retrieval report showing recall@k, precision@k, MRR, nDCG, top-k examples, misses, and noisy chunks by question type.",
          checkpoints: [
            "Define expected relevant chunks or documents for each question.",
            "Measure recall@k, precision@k, MRR, and nDCG.",
            "Break metrics down by query category and document type.",
            "Inspect top false positives and false negatives.",
            "Use failure analysis to choose chunking/retrieval changes."
          ],
          questions: ["What relevant evidence was missed?", "What irrelevant chunks polluted context?", "Which query types fail?"],
          resources: [
            { type: "book", title: "Introduction to Information Retrieval - Evaluation chapter", url: "https://nlp.stanford.edu/IR-book/pdf/irbookonlinereading.pdf", why: "Canonical source for IR metrics.", availability: "Official PDF" },
            { type: "repo", title: "pytrec_eval", url: "https://github.com/cvangysel/pytrec_eval", why: "Standard retrieval evaluation tooling.", availability: "Open-source repo" },
            { type: "repo", title: "ir-measures", url: "https://github.com/terrierteam/ir_measures", why: "Unified retrieval evaluation measures in Python.", availability: "Open-source repo" },
            { type: "docs", title: "Ragas docs", url: "https://docs.ragas.io/en/stable/", why: "Useful for RAG-specific retrieval and answer metrics.", availability: "Official docs" },
            { type: "docs", title: "ARES documentation", url: "https://ares-ai.vercel.app/", why: "Automated RAG component evaluation reference.", availability: "Official docs" }
          ]
        },
        {
          id: "eval-generation-metrics",
          level: "E3 - Generation metrics",
          title: "Faithfulness, groundedness, answer quality, and refusal correctness",
          why: "Generated answers need to be scored for evidence use, factuality, relevance, completeness, and appropriate refusal.",
          deliverable: "Create a generation evaluator with answer relevance, faithfulness, citation support, conflict handling, and refusal correctness scores.",
          checkpoints: [
            "Separate answer correctness from groundedness.",
            "Add citation support checks claim-by-claim.",
            "Test unanswerable cases and required refusal behavior.",
            "Add a human review rubric for calibration.",
            "Compare evaluator outputs with human judgments."
          ],
          questions: ["Is the answer true?", "Is it supported by provided context?", "Should the system have refused?"],
          resources: [
            { type: "paper", title: "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment", url: "https://arxiv.org/abs/2303.16634", why: "Important LLM-as-judge approach for open-ended outputs.", availability: "Free paper" },
            { type: "paper", title: "SelfCheckGPT", url: "https://arxiv.org/abs/2303.08896", why: "Reference for detecting hallucination by consistency checks.", availability: "Free paper" },
            { type: "paper", title: "BERTScore", url: "https://arxiv.org/abs/1904.09675", why: "Embedding-based generation evaluation metric.", availability: "Free paper" },
            { type: "repo", title: "Ragas", url: "https://github.com/explodinggradients/ragas", why: "Faithfulness, answer relevance, and context metrics for RAG.", availability: "Open-source repo" },
            { type: "repo", title: "TruLens", url: "https://github.com/truera/trulens", why: "Groundedness and context relevance evaluation workflows.", availability: "Open-source repo" },
            { type: "docs", title: "DeepEval docs", url: "https://docs.confident-ai.com/", why: "Test-style evaluation for LLM application outputs.", availability: "Official docs" }
          ]
        },
        {
          id: "eval-judge-reliability",
          level: "E4 - Judge reliability",
          title: "LLM-as-judge reliability, bias, and calibration",
          why: "LLM judges are useful but imperfect. Mastery means knowing when to trust them, how to calibrate them, and where human labels are needed.",
          deliverable: "Run judge calibration: compare two LLM judges, one rule-based scorer, and human labels on the same 100 examples.",
          checkpoints: [
            "Define a scoring rubric with explicit pass/fail criteria.",
            "Compare judge agreement with human labels.",
            "Measure sensitivity to prompt wording and model choice.",
            "Use pairwise evaluation where absolute scoring is unstable.",
            "Keep human-reviewed calibration set for future changes."
          ],
          questions: ["Is the judge stable?", "Does it over-score fluent answers?", "Does it catch unsupported claims?"],
          resources: [
            { type: "paper", title: "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena", url: "https://arxiv.org/abs/2306.05685", why: "Canonical paper on LLM judges and pairwise evaluation.", availability: "Free paper" },
            { type: "paper", title: "Prometheus: Inducing Fine-grained Evaluation Capability in Language Models", url: "https://arxiv.org/abs/2310.08491", why: "Open evaluator models and fine-grained rubric following.", availability: "Free paper" },
            { type: "paper", title: "G-Eval", url: "https://arxiv.org/abs/2303.16634", why: "Reference for prompt-based LLM evaluation aligned with human judgment.", availability: "Free paper" },
            { type: "docs", title: "OpenAI graders guide", url: "https://platform.openai.com/docs/guides/graders", why: "Practical modern reference for evaluator construction.", availability: "Official docs" },
            { type: "repo", title: "OpenAI Evals", url: "https://github.com/openai/evals", why: "Framework for custom evals and model/system evaluation.", availability: "Open-source repo" }
          ]
        },
        {
          id: "eval-agent-tool-calls",
          level: "E5 - Agent evaluation",
          title: "Agent and tool-call evaluation",
          why: "Agent success is not just final-answer quality. You need to evaluate tool choice, arguments, sequence, recovery, approval behavior, and stopping behavior.",
          deliverable: "Build agent eval cases for correct tool choice, wrong-tool prevention, missing info, tool failure, risky action approval, hallucinated tool results, and refusal behavior.",
          checkpoints: [
            "Log expected tool sequence for each eval case where applicable.",
            "Score tool selection and argument correctness.",
            "Test tool failure, timeout, empty result, and permission denied.",
            "Test that write actions require approval.",
            "Score final task completion separately from tool trace quality."
          ],
          questions: ["Did it choose the right tool?", "Were arguments correct?", "Did it recover?", "Did it stop safely?"],
          resources: [
            { type: "paper", title: "AgentBench: Evaluating LLMs as Agents", url: "https://arxiv.org/abs/2308.03688", why: "Multi-environment benchmark for evaluating LLMs as agents.", availability: "Free paper" },
            { type: "paper", title: "ToolBench: Towards Evaluating and Training Tool-Augmented LLMs", url: "https://arxiv.org/abs/2307.16789", why: "Tool-use benchmark and training resource.", availability: "Free paper" },
            { type: "paper", title: "SWE-bench", url: "https://arxiv.org/abs/2310.06770", why: "Agentic software engineering benchmark centered on real GitHub issues.", availability: "Free paper" },
            { type: "paper", title: "tau-bench: A Benchmark for Tool-Agent-User Interaction", url: "https://arxiv.org/abs/2406.12045", why: "Tool-agent-user interaction benchmark for realistic agent evaluation.", availability: "Free paper" },
            { type: "repo", title: "AgentBench", url: "https://github.com/THUDM/AgentBench", why: "Official benchmark implementation.", availability: "Open-source repo" },
            { type: "repo", title: "SWE-bench", url: "https://github.com/SWE-bench/SWE-bench", why: "Official repo for software-engineering agent evaluation.", availability: "Open-source repo" },
            { type: "docs", title: "MLflow evaluation quickstart", url: "https://mlflow.org/docs/latest/genai/eval-monitor/quickstart/", why: "Agent/RAG evaluation connected to MLflow.", availability: "Official docs" }
          ]
        },
        {
          id: "eval-regression-release",
          level: "E6 - Regression and release gates",
          title: "Regression evaluation and CI/CD release gates",
          why: "Every prompt, model, tool, chunking, retriever, and orchestration change can regress behavior. Treat eval as a release gate.",
          deliverable: "Create a CI-style eval report that compares current branch vs baseline and fails release on quality, latency, cost, or safety regressions.",
          checkpoints: [
            "Define baseline app version and current candidate version.",
            "Run the same golden dataset against both versions.",
            "Report metric deltas by category, not only aggregate score.",
            "Fail release if critical cases regress.",
            "Store traces and eval results for reproducibility."
          ],
          questions: ["What changed?", "Which categories regressed?", "Is this release safe?"],
          resources: [
            { type: "paper", title: "The ML Test Score", url: "https://research.google/pubs/the-ml-test-score-a-rubric-for-ml-production-readiness-and-technical-debt-reduction/", why: "Production readiness and monitoring rubric that translates well into GenAI gates.", availability: "Free paper" },
            { type: "repo", title: "promptfoo", url: "https://github.com/promptfoo/promptfoo", why: "Practical prompt/model regression testing framework.", availability: "Open-source repo" },
            { type: "repo", title: "OpenAI Evals", url: "https://github.com/openai/evals", why: "Custom evals and version comparison workflows.", availability: "Open-source repo" },
            { type: "repo", title: "DeepEval", url: "https://github.com/confident-ai/deepeval", why: "Unit-test style evaluation for LLM applications.", availability: "Open-source repo" },
            { type: "docs", title: "Databricks evaluate and monitor AI agents", url: "https://docs.databricks.com/aws/en/mlflow3/genai/eval-monitor/", why: "Relevant release-quality path in Databricks.", availability: "Official docs" },
            { type: "docs", title: "MLflow GenAI evaluation", url: "https://mlflow.org/docs/latest/genai/eval-monitor/", why: "Trace-connected evaluation and monitoring for LLM systems.", availability: "Official docs" }
          ]
        }
      ]
    },
    {
      id: "prod",
      track: "Production AI Engineering",
      goal: "Turn RAG and agents into services that are versioned, deployed, governed, observed, tested, and recoverable.",
      accent: "rgba(255,143,199,0.15)",
      masteryQuestions: [
        "How is the app deployed, versioned, configured, and rolled back?",
        "Where are prompts, tools, models, indexes, and eval datasets versioned?",
        "How are costs, latency, failures, and quality monitored?",
        "What permissions and service accounts are required?",
        "Can we reproduce and debug a bad answer from traces?"
      ],
      topics: [
        {
          id: "prod-databricks-native",
          level: "P1 - Databricks native depth",
          title: "Databricks-native production AI stack",
          why: "Master the platform you actually use first: MLflow, Unity Catalog, Vector Search, Workflows, Model Serving, Asset Bundles, secrets, and service principals.",
          deliverable: "Package your RAG/agent app as a Databricks-style asset with jobs, config, model/index versions, eval job, and deployment notes.",
          checkpoints: [
            "Use MLflow for experiments, prompts, traces, and eval results.",
            "Use Unity Catalog for tables, permissions, lineage, and governed model/artifact access.",
            "Create Workflows for ingestion, indexing, evaluation, and monitoring jobs.",
            "Use Asset Bundles for deployment packaging.",
            "Document service principal permissions and secrets."
          ],
          questions: ["Can it be deployed repeatably?", "Can it be governed?", "Can it be traced and evaluated?"],
          resources: [
            { type: "paper", title: "Hidden Technical Debt in ML Systems", url: "https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems", why: "Production ML systems create hidden debt without careful design.", availability: "Free paper" },
            { type: "book", title: "Designing Machine Learning Systems", url: "https://huyenchip.com/books/", why: "System-level design decisions for production ML.", availability: "Official page; no verified legal PDF" },
            { type: "docs", title: "MLflow documentation", url: "https://mlflow.org/docs/latest/", why: "Experiment tracking, models, evaluation, tracing, and GenAI lifecycle.", availability: "Official docs" },
            { type: "docs", title: "Databricks Workflows", url: "https://docs.databricks.com/aws/en/jobs/", why: "Production orchestration for scheduled pipelines and jobs.", availability: "Official docs" },
            { type: "docs", title: "Databricks Model Serving", url: "https://docs.databricks.com/aws/en/machine-learning/model-serving/", why: "Serving models and AI endpoints in Databricks.", availability: "Official docs" },
            { type: "docs", title: "Databricks Asset Bundles", url: "https://docs.databricks.com/aws/en/dev-tools/bundles/", why: "CI/CD-friendly deployment packaging.", availability: "Official docs" }
          ]
        },
        {
          id: "prod-api-wrapper",
          level: "P2 - API service wrapper",
          title: "FastAPI service wrapper for RAG/agents",
          why: "Even if Databricks is the core platform, you need to expose AI behavior as a clean service with auth, request IDs, health checks, config, and logs.",
          deliverable: "Expose your RAG/agent workflow through FastAPI with /health, /query, /feedback, /trace/{id}, config loading, request IDs, and error handling.",
          checkpoints: [
            "Define typed request/response schemas.",
            "Add request IDs and structured logging.",
            "Add timeout and error boundaries around model/retriever/tool calls.",
            "Add feedback endpoint and trace lookup endpoint.",
            "Add simple auth placeholder and user/tenant metadata propagation."
          ],
          questions: ["What is the public contract?", "How are errors surfaced?", "Can every request be traced?"],
          resources: [
            { type: "book", title: "Designing Data-Intensive Applications", url: "https://dataintensive.net/", why: "System design foundation for services, data, reliability, and tradeoffs.", availability: "Official page; no verified legal PDF" },
            { type: "docs", title: "FastAPI documentation", url: "https://fastapi.tiangolo.com/", why: "Core API framework for typed Python services.", availability: "Official docs" },
            { type: "docs", title: "Pydantic documentation", url: "https://docs.pydantic.dev/latest/", why: "Typed validation and settings management.", availability: "Official docs" },
            { type: "docs", title: "OpenAPI specification", url: "https://spec.openapis.org/oas/latest.html", why: "API contract standards for services and tools.", availability: "Official docs" },
            { type: "tutorial", title: "FastAPI user guide", url: "https://fastapi.tiangolo.com/tutorial/", why: "Practical route, validation, dependency, and error patterns.", availability: "Tutorial" }
          ]
        },
        {
          id: "prod-docker-container",
          level: "P3 - Container basics",
          title: "Docker and containerization for AI services",
          why: "You do not need Kubernetes mastery yet, but you should be able to containerize, configure, run, and debug your AI service locally and in Cloud Run.",
          deliverable: "Create a Dockerfile and docker-compose setup for your FastAPI RAG/agent service with environment-based config and health checks.",
          checkpoints: [
            "Write a minimal production-friendly Dockerfile.",
            "Use environment variables for config, not hardcoded secrets.",
            "Add health check and startup validation.",
            "Run local container and call the API.",
            "Document image build, run, and troubleshooting commands."
          ],
          questions: ["Can another engineer run this reliably?", "Are secrets excluded?", "Does the container expose health status?"],
          resources: [
            { type: "docs", title: "Docker Docs", url: "https://docs.docker.com/", why: "Official Docker documentation.", availability: "Official docs" },
            { type: "docs", title: "Docker: Containerize an application", url: "https://docs.docker.com/get-started/workshop/02_our_app/", why: "Practical official tutorial for creating and running containers.", availability: "Official docs" },
            { type: "docs", title: "Docker Compose docs", url: "https://docs.docker.com/compose/", why: "Useful for local multi-service development.", availability: "Official docs" },
            { type: "article", title: "Python Docker image best practices", url: "https://pythonspeed.com/docker/", why: "Practical optimization and debugging tips for Python containers.", availability: "Article" }
          ]
        },
        {
          id: "prod-gcp-cloudrun-vertex",
          level: "P4 - GCP deployment basics",
          title: "GCP Cloud Run, IAM, Secret Manager, logging, and Vertex AI",
          why: "For your GCP context, Cloud Run and Vertex AI Agent Builder are more immediate than Kubernetes. Learn managed deployment, identity, secrets, logs, and monitoring.",
          deliverable: "Deploy the FastAPI RAG/agent service to Cloud Run with service account, Secret Manager config, Cloud Logging, and basic dashboards.",
          checkpoints: [
            "Deploy container to Cloud Run.",
            "Create least-privilege service account.",
            "Use Secret Manager for credentials/config.",
            "Send structured logs to Cloud Logging.",
            "Explore Vertex AI Agent Builder and map what it would replace or complement."
          ],
          questions: ["Which identity runs the service?", "Where are secrets?", "How are logs and errors inspected?"],
          resources: [
            { type: "docs", title: "Cloud Run documentation", url: "https://docs.cloud.google.com/run/docs", why: "Managed container/application platform on Google Cloud.", availability: "Official docs" },
            { type: "docs", title: "What is Cloud Run", url: "https://docs.cloud.google.com/run/docs/Dashboard/what-is-cloud-run", why: "Clear Dashboard of deployment model and capabilities.", availability: "Official docs" },
            { type: "docs", title: "Secret Manager documentation", url: "https://cloud.google.com/secret-manager/docs", why: "Secure configuration and secret handling.", availability: "Official docs" },
            { type: "docs", title: "Cloud Logging documentation", url: "https://cloud.google.com/logging/docs", why: "Logging and debugging production services.", availability: "Official docs" },
            { type: "docs", title: "Vertex AI Agent Builder documentation", url: "https://docs.cloud.google.com/agent-builder", why: "Google Cloud's suite for building, scaling, and governing production AI agents.", availability: "Official docs" },
            { type: "docs", title: "Vertex AI documentation", url: "https://cloud.google.com/vertex-ai/docs", why: "Managed ML/GenAI platform reference.", availability: "Official docs" }
          ]
        },
        {
          id: "prod-observability",
          level: "P5 - GenAI observability",
          title: "Tracing, logs, metrics, feedback, and cost monitoring",
          why: "You can learn observability without a massive production app by simulating traffic, failures, slow tools, bad retrieval, and cost spikes.",
          deliverable: "Add tracing, request logs, token/cost tracking, latency metrics, tool failure metrics, retrieval failure metrics, feedback capture, and a simple dashboard.",
          checkpoints: [
            "Instrument every request with trace ID and span structure.",
            "Capture model call latency, token usage, and cost estimate.",
            "Capture retrieved chunks, reranker scores, tool calls, and final output.",
            "Create synthetic traffic and failure injection scripts.",
            "Build a weekly quality/cost/latency report."
          ],
          questions: ["Can a bad answer be reproduced?", "Where did latency come from?", "Which component is failing most?"],
          resources: [
            { type: "paper", title: "Dapper: A Large-Scale Distributed Systems Tracing Infrastructure", url: "https://research.google/pubs/dapper-a-large-scale-distributed-systems-tracing-infrastructure/", why: "Foundational paper for distributed tracing ideas.", availability: "Free paper" },
            { type: "paper", title: "The Tail at Scale", url: "https://research.google/pubs/the-tail-at-scale/", why: "Important systems paper for latency and tail behavior.", availability: "Free paper" },
            { type: "book", title: "Observability Engineering", url: "https://www.honeycomb.io/resources/observability-engineering-oreilly-book-2022", why: "Modern observability mindset and practices.", availability: "Official page; no verified legal PDF" },
            { type: "docs", title: "OpenTelemetry documentation", url: "https://opentelemetry.io/docs/", why: "Vendor-neutral traces, metrics, and logs.", availability: "Official docs" },
            { type: "docs", title: "OpenTelemetry GenAI semantic conventions", url: "https://opentelemetry.io/docs/specs/semconv/gen-ai/", why: "Emerging standard for LLM/agent telemetry attributes.", availability: "Official docs" },
            { type: "docs", title: "MLflow Tracing - GenAI observability", url: "https://mlflow.org/docs/latest/genai/tracing/", why: "GenAI tracing with OpenTelemetry compatibility.", availability: "Official docs" },
            { type: "repo", title: "Langfuse", url: "https://github.com/langfuse/langfuse", why: "Open-source LLM observability and tracing platform.", availability: "Open-source repo" },
            { type: "repo", title: "Arize Phoenix", url: "https://github.com/Arize-ai/phoenix", why: "Open-source observability and evaluation for LLM applications.", availability: "Open-source repo" },
            { type: "repo", title: "OpenLLMetry", url: "https://github.com/traceloop/openllmetry", why: "OpenTelemetry-native LLM observability instrumentation.", availability: "Open-source repo" }
          ]
        },
        {
          id: "prod-aiops-lite",
          level: "P6 - AIOps-lite",
          title: "AIOps-lite: incident triage, log anomaly detection, and runbook agents",
          why: "AIOps can be simulated: logs, metrics, traces, alerts, root-cause summaries, and safe human-approved remediation suggestions.",
          deliverable: "Build an incident RCA assistant that takes synthetic logs, metrics, traces, deploy history, and runbooks, then outputs probable cause, evidence, confidence, and safe next steps.",
          checkpoints: [
            "Create synthetic service logs with normal and anomalous patterns.",
            "Add log parsing and anomaly detection baseline.",
            "Create alert-to-runbook retrieval.",
            "Create RCA summarization with evidence citations.",
            "Add human approval before any remediation action."
          ],
          questions: ["What changed recently?", "Which signal is anomalous?", "What evidence supports the RCA?", "What action is safe?"],
          resources: [
            { type: "paper", title: "DeepLog: Anomaly Detection and Diagnosis from System Logs", url: "https://www.cs.utah.edu/~lifeifei/papers/deeplog.pdf", why: "Classic deep learning paper for log anomaly detection.", availability: "Free paper" },
            { type: "paper", title: "Drain: An Online Log Parsing Approach with Fixed Depth Tree", url: "https://jiemingzhu.github.io/pub/pjhe_icws2017.pdf", why: "Important log parsing baseline for AIOps systems.", availability: "Free paper" },
            { type: "paper", title: "LogBERT: Log Anomaly Detection via BERT", url: "https://arxiv.org/abs/2103.04475", why: "Modern language-model-inspired log anomaly detection.", availability: "Free paper" },
            { type: "book", title: "Site Reliability Engineering - Google", url: "https://sre.google/sre-book/table-of-contents/", why: "Reliability, incident, SLO, and operational excellence foundation.", availability: "Free official online" },
            { type: "repo", title: "Prometheus", url: "https://github.com/prometheus/prometheus", why: "Core open-source metrics and alerting system.", availability: "Open-source repo" },
            { type: "repo", title: "Grafana", url: "https://github.com/grafana/grafana", why: "Dashboards and observability visualization.", availability: "Open-source repo" },
            { type: "docs", title: "OpenTelemetry logs", url: "https://opentelemetry.io/docs/concepts/signals/logs/", why: "Telemetry grounding for logs, metrics, and traces.", availability: "Official docs" }
          ]
        },
        {
          id: "prod-infra-later",
          level: "P7 - Infra backlog",
          title: "Terraform and Kubernetes awareness, not obsession",
          why: "Learn enough to understand deployment conversations, but do not let K8s/Terraform distract from RAG, agents, eval, and Databricks/GCP depth yet.",
          deliverable: "Create one minimal Terraform deployment and one minimal Kubernetes deployment for a toy FastAPI service, then stop unless your project needs more.",
          checkpoints: [
            "Understand what Terraform solves: repeatable infrastructure state.",
            "Understand Kubernetes primitives: pod, deployment, service, ingress, configmap, secret.",
            "Deploy a toy service locally or to a sandbox cluster.",
            "Write when not to use Kubernetes.",
            "Return focus to AI quality, eval, and production behavior."
          ],
          questions: ["Do we need K8s or would Cloud Run work?", "What infra is actually required?", "Can I debug a basic deployment?"],
          resources: [
            { type: "book", title: "Kubernetes: Up and Running", url: "https://www.oreilly.com/library/view/kubernetes-up-and/9781098110192/", why: "Practical Kubernetes foundation if/when needed.", availability: "Official page; no verified legal PDF" },
            { type: "docs", title: "Kubernetes documentation", url: "https://kubernetes.io/docs/home/", why: "Official Kubernetes reference.", availability: "Official docs" },
            { type: "docs", title: "Terraform documentation", url: "https://developer.hashicorp.com/terraform/docs", why: "Official Terraform reference.", availability: "Official docs" },
            { type: "docs", title: "Helm documentation", url: "https://helm.sh/docs/", why: "Package manager for Kubernetes applications.", availability: "Official docs" },
            { type: "tutorial", title: "Google Cloud Terraform tutorials", url: "https://cloud.google.com/docs/terraform", why: "GCP-specific Terraform learning path.", availability: "Tutorial" }
          ]
        }
      ]
    },
    {
      id: "backlog",
      track: "Core Algorithmic Foundations",
      goal: "Keep ML algorithms, deep learning, math, and transformers warm in parallel without derailing your main production AI path.",
      accent: "rgba(121,242,166,0.15)",
      masteryQuestions: [
        "Can I explain the algorithmic reason behind a model behavior?",
        "Can I implement the basic version from scratch once?",
        "Can I connect model internals to production failure modes?",
        "Can I read relevant papers without getting blocked by notation?"
      ],
      topics: [
        {
          id: "backlog-math-ml",
          level: "B1 - Slow burn",
          title: "Math and classic ML algorithms backlog",
          why: "You know the basics. Keep depth-building in the background: linear algebra, probability, optimization, trees, boosting, SVMs, clustering, anomaly detection.",
          deliverable: "Implement one algorithm from scratch every 2 weeks and write a one-page why-it-works note.",
          checkpoints: [
            "Implement linear/logistic regression with gradient descent from scratch.",
            "Implement decision tree splitting and impurity metrics.",
            "Implement k-means and PCA using NumPy.",
            "Study bias-variance, regularization, calibration, and drift links to production.",
            "Keep notes focused on debugging and production implications."
          ],
          questions: ["What assumptions does this algorithm make?", "When does it fail?", "How would I monitor it in production?"],
          resources: [
            { type: "book", title: "The Hundred-Page Machine Learning Book", url: "http://themlbook.com/", why: "Concise refresh for classic ML.", availability: "Official page; no verified legal PDF" },
            { type: "book", title: "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow", url: "https://github.com/ageron/handson-ml3", why: "Practical ML/DL reference.", availability: "Official code repo; book is paid" },
            { type: "course", title: "CS229 Machine Learning", url: "https://cs229.stanford.edu/", why: "Classic ML theory and algorithms.", availability: "Course" },
            { type: "course", title: "3Blue1Brown Linear Algebra", url: "https://www.3blue1brown.com/topics/linear-algebra", why: "Visual intuition for linear algebra.", availability: "Course" },
            { type: "course", title: "MIT 18.06 Linear Algebra", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", why: "Full linear algebra course.", availability: "Course" }
          ]
        },
        {
          id: "backlog-dl-transformers",
          level: "B2 - Deep learning and transformers",
          title: "Deep learning, attention, and transformer internals backlog",
          why: "You do not need to pause production AI work for DL theory, but you should steadily understand backprop, attention, embeddings, fine-tuning, LoRA, RLHF, and DPO.",
          deliverable: "Build a tiny transformer from scratch, then fine-tune a small model with LoRA and write a failure-analysis note.",
          checkpoints: [
            "Implement a tiny neural network and backprop from scratch.",
            "Implement scaled dot-product attention.",
            "Train or fine-tune a small transformer on a toy task.",
            "Experiment with embeddings and similarity.",
            "Summarize LoRA/QLoRA, RLHF, and DPO at implementation level."
          ],
          questions: ["What does attention compute?", "Why do embeddings cluster?", "What changes during LoRA fine-tuning?"],
          resources: [
            { type: "paper", title: "Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762", why: "Canonical transformer paper.", availability: "Free paper" },
            { type: "paper", title: "LoRA: Low-Rank Adaptation of Large Language Models", url: "https://arxiv.org/abs/2106.09685", why: "Core parameter-efficient fine-tuning method.", availability: "Free paper" },
            { type: "paper", title: "Direct Preference Optimization", url: "https://arxiv.org/abs/2305.18290", why: "Important alignment/fine-tuning method.", availability: "Free paper" },
            { type: "book", title: "Dive into Deep Learning", url: "https://d2l.ai/", why: "Free hands-on deep learning book.", availability: "Free official online" },
            { type: "book", title: "Deep Learning - Goodfellow, Bengio, Courville", url: "https://www.deeplearningbook.org/", why: "Foundational deep learning theory.", availability: "Free official online; no legal PDF" },
            { type: "course", title: "CS224N Natural Language Processing with Deep Learning", url: "https://web.stanford.edu/class/cs224n/", why: "Strong NLP and transformer foundation.", availability: "Course" },
            { type: "repo", title: "nanoGPT", url: "https://github.com/karpathy/nanoGPT", why: "Minimal practical transformer training repo.", availability: "Open-source repo" }
          ]
        }
      ]
    }
  ],
  roadmap: [
    { month: "Month 1", title: "Retrieval mastery", goal: "Become very strong at retrieval and chunking.", outputs: ["5 chunking strategies", "retrieval benchmark", "failure examples", "recommendation doc"], linkedTopics: ["rag-chunking", "rag-retrieval", "rag-reranking"] },
    { month: "Month 2", title: "Advanced RAG system", goal: "Build production-style RAG with ingestion, metadata, hybrid search, reranking, citations, refusal, feedback, and tracing.", outputs: ["enterprise RAG v1", "eval dataset", "MLflow traces", "feedback table"], linkedTopics: ["rag-ingestion", "rag-generation-grounding", "rag-evaluation", "rag-databricks-production"] },
    { month: "Month 3", title: "Agent control flow", goal: "Build reliable single-agent workflows with LangGraph-style state and controlled flow.", outputs: ["MLOps Copilot Agent v1", "tool registry", "state persistence", "approval gate"], linkedTopics: ["agent-state-memory", "agent-tool-design", "agent-control-flow", "agent-human-loop"] },
    { month: "Month 4", title: "Agent evaluation", goal: "Evaluate behavior, not just final text.", outputs: ["agent eval harness", "tool-call scoring", "failure simulations", "regression report"], linkedTopics: ["eval-dataset", "eval-agent-tool-calls", "eval-regression-release", "agent-security"] },
    { month: "Month 5", title: "Productionization", goal: "Turn RAG/agent system into a deployable service.", outputs: ["FastAPI wrapper", "Docker image", "Databricks/GCP config", "release gate"], linkedTopics: ["prod-databricks-native", "prod-api-wrapper", "prod-docker-container", "prod-gcp-cloudrun-vertex"] },
    { month: "Month 6", title: "Observability and AIOps-lite", goal: "Simulate production failure modes and add observability.", outputs: ["trace dashboard", "synthetic traffic", "failure injection", "incident RCA assistant"], linkedTopics: ["prod-observability", "prod-aiops-lite", "eval-regression-release"] }
  ],
  month30: [
    { week: "Week 1", title: "Retrieval lab", tasks: ["Compare fixed, recursive, semantic, section-aware, parent-child, and hybrid retrieval.", "Output: retrieval benchmark plus failure examples."] },
    { week: "Week 2", title: "RAG eval lab", tasks: ["Create 50-100 test questions across answerable, unanswerable, ambiguous, multi-doc, and citation-heavy cases.", "Output: RAG eval harness v1."] },
    { week: "Week 3", title: "Agent workflow lab", tasks: ["Build router, retriever node, tool node, critique node, approval node, and final response node.", "Output: controlled agent workflow."] },
    { week: "Week 4", title: "Production wrapper", tasks: ["Add MLflow tracing, request logs, feedback capture, config, prompt versioning, latency/cost tracking.", "Output: RAG/agent component that looks like a real internal platform service."] }
  ],
  capstone: {
    title: "Enterprise AI Support Engineer",
    thesis: "One serious system combining RAG, agents, MLOps, AIOps-lite, evaluation, Databricks/GCP engineering, and observability.",
    questions: [
      "Why did this ML job fail?",
      "Which model version was promoted last?",
      "Compare these two MLflow runs.",
      "What changed between yesterday's and today's pipeline?",
      "Generate a rollback checklist.",
      "Which documents support this answer?",
      "Should this deployment be approved?"
    ],
    components: [
      "RAG over runbooks, policies, project docs, and troubleshooting guides.",
      "Tools over mock MLflow runs, Databricks job metadata, logs, feature tables, and deployment records.",
      "LangGraph-style controlled orchestration with explicit state.",
      "Human approval for write/risky actions.",
      "RAG and agent evaluation harness.",
      "MLflow traces, feedback loop, latency/cost tracking, and failure simulations."
    ],
    milestones: [
      "M1: Retrieval benchmark and ingestion quality report.",
      "M2: Evaluated enterprise RAG with citations and refusal.",
      "M3: MLOps copilot agent with tool registry and state.",
      "M4: Agent eval harness and regression gates.",
      "M5: FastAPI/Docker/Databricks-GCP deployable service.",
      "M6: Observability dashboard and incident RCA assistant."
    ],
    engineeringNotes: [
      "Why my RAG failed on multi-hop questions",
      "What changed after adding reranking",
      "How I evaluated citation correctness",
      "Why my agent called the wrong tool",
      "How human approval changes agent design",
      "How I traced an LLM workflow with MLflow",
      "How I simulated production failures without a real production app"
    ]
  }
};