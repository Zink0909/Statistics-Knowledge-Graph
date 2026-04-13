import { NODE_CONTENT } from "../../data/content";

interface Props {
  nodeId: string;
}

export default function ContentCard({ nodeId }: Props) {
  const content = NODE_CONTENT[nodeId];

  if (!content) {
    return (
      <div className="card px-5 py-4 text-sm text-stone-400">
        Content for this concept has not been added yet.
        It will be included in the next quarterly update.
      </div>
    );
  }

  return (
    <div className="card px-5 py-5 space-y-4">
      {/* Definition */}
      <div>
        <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
          Definition
        </div>
        <p className="text-sm text-stone-700 leading-relaxed">{content.definition}</p>
      </div>

      {/* Formula */}
      {content.formula && (
        <div>
          <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
            Formula
          </div>
          <div className="bg-stone-50 rounded-lg px-4 py-3 font-mono text-sm text-stone-800 leading-relaxed whitespace-pre-wrap border border-stone-100">
            {content.formula}
          </div>
        </div>
      )}

      {/* Parameters */}
      {content.parameters && content.parameters.length > 0 && (
        <div>
          <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
            Parameters
          </div>
          <ul className="space-y-1">
            {content.parameters.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                <span className="text-stone-300 mt-0.5 flex-shrink-0">·</span>
                <span className="font-mono text-xs leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Intuition */}
      <div>
        <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
          Intuition
        </div>
        <p className="text-sm text-stone-600 leading-relaxed italic">
          {content.intuition}
        </p>
      </div>

      {/* Common confusion */}
      {content.common_confusion && (
        <div className="border-l-2 border-amber-300 pl-3">
          <div className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider mb-1">
            Common confusion
          </div>
          <p className="text-sm text-stone-600 leading-relaxed">
            {content.common_confusion}
          </p>
        </div>
      )}

      {/* Example use */}
      <div>
        <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
          Example
        </div>
        <p className="text-sm text-stone-600 leading-relaxed">{content.example_use}</p>
      </div>
    </div>
  );
}
