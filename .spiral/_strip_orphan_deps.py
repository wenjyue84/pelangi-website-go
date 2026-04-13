import json,sys
path=sys.argv[1]
prd=json.load(open(path,encoding="utf-8"))
valid={s["id"] for s in prd["userStories"]}
fixed=0
for s in prd["userStories"]:
    old=s.get("dependencies",[])
    new=[d for d in old if d in valid]
    if len(new)!=len(old):s["dependencies"]=new;fixed+=1
fixed and json.dump(prd,open(path,"w",encoding="utf-8"),indent=2,ensure_ascii=False)
print(fixed)
