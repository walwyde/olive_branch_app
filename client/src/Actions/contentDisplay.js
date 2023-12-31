const suicideIdeation = {
  title: "Suicide Ideation",
  description:
    "Life is too precious to terminate it prematurely. Pause, talk to someone, reflect and rediscover the purpose of your life. We can help.",
  expertAdvice:
    "Even the strongest people experience suicidal thoughts that are usually triggered by stress and mental health challenges. If you’re experiencing  suicidal thoughts, having a good support system can help you pull through.",
};

const depression = {
  title: "Depression",
  description:
    "Are you going through a stressful situation that is putting you down? Don't drown in your own thoughts. We're here to help.",
  expertAdvice:
    "One thing that always helps with depression is taking care of yourself, building up your self-esteem. By taking care of yourself we mean eating well, try exercising and yoga, meditating, taking yourself out, treating yourself, all these really help build up a good mental health which with time helps you handle stress differently. Reachout will always be your home, so if you ever need to talk to someone, do not hesitate to reach us.",
};

const anxiety = {
  title: "Anxiety",
  description:
    "Are you unsettled because you are anxious over something? You are absolutely normal and you need to calm down. Engage us.",
  expertAdvice:
    "Try to understand what you are going through and what exactly triggers your anxiety, it could be post traumatic stress, social anxiety or obsessive anxiety. Most of these anxiety come from within and it really helps to work on yourself and assure yourself you are the most important thing to yourself. You can always talk to us and we will be glad to walk with you through the process.",
};

const relationship = {
  title: "Relationships",
  description:
    "Relationships can be rocky, but they should make you strong. Engaging a professional can save your union. Any trouble?",
  expertAdvice:
    "We all deserve to feel loved and cared for- the reason why we feel like we’ve hit the end of the world when our relationships break down. Much as we do not have control over other people’s commitment to give us the treatment we deserve, finding solace in our inner self is vital.",
};
const addiction = {
  title: "Addiction",
  description:
    "Addictions should not control your life. Overcome them by engaging a ReachOut Consel Professional.",
  expertAdvice:
    "Old habits die hard, but not for everyone. Whereas some people can overcome addictions by themselves, others require guidance and support. ReachOut counsel is a reliable partner in walking you through your addiction withdrawal process, regardless of how embarrassing your situation is. We do not judge because we’ve all been there.",
};

const loss = {
  title: "Loss",
  description:
    "Loss is unbearable, but there is much more to live for. We may never bring them back, but we can recover our happiness.",
  expertAdvice:
    "The pain of losing a member of your family or a loved one never really goes away, especially if you were close. We just need to learn how to live with it because one thing is for sure the pain becomes more bearable with time.Try appreciating them in your thoughts, like every loss it won't be a quick process it will take time to adjust to. Always feel free to reach out to us, we are here for you.",
};

// function to change the content to display on the iframe

export function displayContent(id) {
  let content = {};

  // display content based on the clicked button
  if (id === "suicidal_ideation") {
    content = suicideIdeation;
  } else if (id === "addiction") {
    content = addiction;
  } else if (id === "loss") {
    content = loss;
  } else if (id === "anxiety") {
    content = anxiety;
  } else if (id === "relationship") {
    content = relationship;
  } else if (id === "depression") {
    content = depression;
  } else {
    content = addiction;
  }

  return content;
}